//@tag dom,core
/**
 * Represents single event type that an Observable object listens to.
 * All actual listeners are tracked inside here.  When the event fires,
 * it calls all the registered listener functions.
 *
 * @private
 */
Ext.define('Ext.util.Event', {
    requires: 'Ext.util.DelayedTask',

    /**
     * @property {Boolean} isEvent
     * `true` in this class to identify an object as an instantiated Event, or subclass thereof.
     */
    isEvent: true,
    
    // Private. Event suspend count
    suspended: 0,

    noOptions: {},
    
    constructor: function(observable, name) {
        this.name = name;
        this.observable = observable;
        this.listeners = [];
    },

    addListener: function(fn, scope, options) {
        var me = this,
            listeners, listener, priority, isNegativePriority, highestNegativePriorityIndex,
            hasNegativePriorityIndex, length, index, i;
            scope = scope || me.observable;

        //<debug error>
        if (!fn) {
            Ext.Error.raise({
                sourceClass: Ext.getClassName(this.observable),
                sourceMethod: "addListener",
                msg: "The specified callback function is undefined"
            });
        }
        //</debug>

        if (!me.isListening(fn, scope)) {
            listener = me.createListener(fn, scope, options);
            if (me.firing) {
                // if we are currently firing this event, don't disturb the listener loop
                me.listeners = me.listeners.slice(0);
            }
            listeners = me.listeners;
            index = length = listeners.length;
            priority = options && options.priority;
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;
            hasNegativePriorityIndex = (highestNegativePriorityIndex !== undefined);
            if (priority) {
                // Find the index at which to insert the listener into the listeners array,
                // sorted by priority highest to lowest.
                isNegativePriority = (priority < 0);
                if (!isNegativePriority || hasNegativePriorityIndex) {
                    // If the priority is a positive number, or if it is a negative number
                    // and there are other existing negative priority listenrs, then we
                    // need to calcuate the listeners priority-order index.
                    // If the priority is a negative number, begin the search for priority
                    // order index at the index of the highest existing negative priority
                    // listener, otherwise begin at 0
                    for(i = (isNegativePriority ? highestNegativePriorityIndex : 0); i < length; i++) {
                        if ((listeners[i].o.priority || 0) < priority) {
                            index = i;
                            break;
                        }
                    }
                } else {
                    // if the priority is a negative number, and there are no other negative
                    // priority listeners, then no calculation is needed - the negative
                    // priority listener gets appended to the end of the listeners array.
                    me._highestNegativePriorityIndex = index;
                }
            } else if (hasNegativePriorityIndex) {
                // listeners with a priority of 0 or undefined are appended to the end of
                // the listeners array unless there are negative priority listeners in the
                // listeners array, then they are inserted before the highest negative
                // priority listener.
                index = highestNegativePriorityIndex;
            }

            if (!isNegativePriority && index <= highestNegativePriorityIndex) {
                me._highestNegativePriorityIndex ++;
            }
            Ext.Array.splice(me.listeners, index, 0, listener);
        }
    },

    createListener: function(fn, scope, o) {
        o = o || {};
        scope = scope || this.observable;

        var me = this,
            listener = {
                fn: fn,
                scope: scope,
                o: o,
                ev: me
            },
            handler = fn;

        // The order is important. The 'single' wrapper must be wrapped by the 'buffer' and 'delayed' wrapper
        // because the event removal that the single listener does destroys the listener's DelayedTask(s)
        if (o.single) {
            handler = me.createSingle(handler, listener, o, scope);
        }
        if (o.target) {
            handler = me.createTargeted(handler, listener, o, scope);
        }
        if (o.delay) {
            handler = me.createDelayed(handler, listener, o, scope);
        }
        if (o.buffer) {
            handler = me.createBuffered(handler, listener, o, scope);
        }

        listener.fireFn = handler;
        return listener;
    },

    findListener: function(fn, scope) {
        var listeners = this.listeners,
        i = listeners.length,
        listener,
        s;

        while (i--) {
            listener = listeners[i];
            if (listener) {
                s = listener.scope;

                // Compare the listener's scope with *JUST THE PASSED SCOPE* if one is passed, and only fall back to the owning Observable if none is passed.
                // We cannot use the test (s == scope || s == this.observable)
                // Otherwise, if the Observable itself adds Ext.emptyFn as a listener, and then Ext.emptyFn is added under another scope, there will be a false match.
                if (listener.fn == fn && (s == (scope || this.observable))) {
                    return i;
                }
            }
        }

        return - 1;
    },

    isListening: function(fn, scope) {
        return this.findListener(fn, scope) !== -1;
    },

    removeListener: function(fn, scope) {
        var me = this,
            index,
            listener,
            highestNegativePriorityIndex,
            k;
        index = me.findListener(fn, scope);
        if (index != -1) {
            listener = me.listeners[index];
            highestNegativePriorityIndex = me._highestNegativePriorityIndex;

            if (me.firing) {
                me.listeners = me.listeners.slice(0);
            }

            // cancel and remove a buffered handler that hasn't fired yet
            if (listener.task) {
                listener.task.cancel();
                delete listener.task;
            }

            // cancel and remove all delayed handlers that haven't fired yet
            k = listener.tasks && listener.tasks.length;
            if (k) {
                while (k--) {
                    listener.tasks[k].cancel();
                }
                delete listener.tasks;
            }

            // remove this listener from the listeners array
            Ext.Array.erase(me.listeners, index, 1);

            // if the listeners array contains negative priority listeners, adjust the
            // internal index if needed.
            if (highestNegativePriorityIndex) {
                if (index < highestNegativePriorityIndex) {
                    me._highestNegativePriorityIndex --;
                } else if (index === highestNegativePriorityIndex && index === me.listeners.length) {
                    delete me._highestNegativePriorityIndex;
                }
            }
            return true;
        }

        return false;
    },

    // Iterate to stop any buffered/delayed events
    clearListeners: function() {
        var listeners = this.listeners,
            i = listeners.length;

        while (i--) {
            this.removeListener(listeners[i].fn, listeners[i].scope);
        }
    },

    suspend: function() {
        this.suspended += 1;
    },

    resume: function() {
        if (this.suspended) {
            this.suspended--;
        }
    },

    fire: function() {
        var me = this,
            listeners = me.listeners,
            count = listeners.length,
            i,
            args,
            listener;

        if (!me.suspended && count > 0) {
            me.firing = true;
            for (i = 0; i < count; i++) {
                listener = listeners[i];
                args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                if (listener.o) {
                    args.push(listener.o);
                }
                if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                    return (me.firing = false);
                }
            }
        }
        me.firing = false;
        return true;
    },

    createTargeted: function (handler, listener, o, scope) {
        return function(){
            if (o.target === arguments[0]){
                handler.apply(scope, arguments);
            }
        };
    },

    createBuffered: function (handler, listener, o, scope) {
        listener.task = new Ext.util.DelayedTask();
        return function() {
            listener.task.delay(o.buffer, handler, scope, Ext.Array.toArray(arguments));
        };
    },

    createDelayed: function (handler, listener, o, scope) {
        return function() {
            var task = new Ext.util.DelayedTask();
            if (!listener.tasks) {
                listener.tasks = [];
            }
            listener.tasks.push(task);
            task.delay(o.delay || 10, handler, scope, Ext.Array.toArray(arguments));
        };
    },

    createSingle: function (handler, listener, o, scope) {
        return function() {
            var event = listener.ev;

            if (event.removeListener(listener.fn, scope) && event.observable) {
                // Removing from a regular Observable-owned, named event (not an anonymous
                // event such as Ext's readyEvent): Decrement the listeners count
                event.observable.hasListeners[event.name]--;
            }

            return handler.apply(scope, arguments);
        };
    }
});
