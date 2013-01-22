/**
 * @class Ext.ZIndexManager
 * <p>A class that manages a group of {@link Ext.Component#floating} Components and provides z-order management,
 * and Component activation behavior, including masking below the active (topmost) Component.</p>
 * <p>{@link Ext.Component#floating Floating} Components which are rendered directly into the document (such as {@link Ext.window.Window Window}s) which are
 * {@link Ext.Component#show show}n are managed by a {@link Ext.WindowManager global instance}.</p>
 * <p>{@link Ext.Component#floating Floating} Components which are descendants of {@link Ext.Component#floating floating} <i>Containers</i>
 * (for example a {@link Ext.view.BoundList BoundList} within an {@link Ext.window.Window Window}, or a {@link Ext.menu.Menu Menu}),
 * are managed by a ZIndexManager owned by that floating Container. Therefore ComboBox dropdowns within Windows will have managed z-indices
 * guaranteed to be correct, relative to the Window.</p>
 */
Ext.define('Ext.ZIndexManager', {

    alternateClassName: 'Ext.WindowGroup',

    statics: {
        zBase : 9000
    },

    constructor: function(container) {
        var me = this;

        me.list = {};
        me.zIndexStack = [];
        me.front = null;

        if (container) {

            // This is the ZIndexManager for an Ext.container.Container, base its zseed on the zIndex of the Container's element
            if (container.isContainer) {
                container.on('resize', me._onContainerResize, me);
                me.zseed = Ext.Number.from(container.getEl().getStyle('zIndex'), me.getNextZSeed());
                // The containing element we will be dealing with (eg masking) is the content target
                me.targetEl = container.getTargetEl();
                me.container = container;
            }
            // This is the ZIndexManager for a DOM element
            else {
                Ext.EventManager.onWindowResize(me._onContainerResize, me);
                me.zseed = me.getNextZSeed();
                me.targetEl = Ext.get(container);
            }
        }
        // No container passed means we are the global WindowManager. Our target is the doc body.
        // DOM must be ready to collect that ref.
        else {
            Ext.EventManager.onWindowResize(me._onContainerResize, me);
            me.zseed = me.getNextZSeed();
            Ext.onDocumentReady(function() {
                me.targetEl = Ext.getBody();
            });
        }
    },

    getNextZSeed: function() {
        return (Ext.ZIndexManager.zBase += 10000);
    },

    setBase: function(baseZIndex) {
        this.zseed = baseZIndex;
        return this.assignZIndices();
    },

    // private
    assignZIndices: function() {
        var a = this.zIndexStack,
            len = a.length,
            i = 0,
            zIndex = this.zseed,
            comp;

        for (; i < len; i++) {
            comp = a[i];
            if (comp && !comp.hidden) {

                // Setting the zIndex of a Component returns the topmost zIndex consumed by
                // that Component.
                // If it's just a plain floating Component such as a BoundList, then the
                // return value is the passed value plus 10, ready for the next item.
                // If a floating *Container* has its zIndex set, it re-orders its managed
                // floating children, starting from that new base, and returns a value 10000 above
                // the highest zIndex which it allocates.
                zIndex = comp.setZIndex(zIndex);
            }
        }
        this._activateLast();
        return zIndex;
    },

    // private
    _setActiveChild: function(comp) {
        var front = this.front;
        if (comp !== front) {

            if (front && !front.destroying) {
                front.setActive(false, comp);
            }
            this.front = comp;
            if (comp) {
                comp.setActive(true);
                if (comp.modal) {
                    this._showModalMask(comp);
                }
            }
        }
    },

    // private
    _activateLast: function() {
        var me = this,
            lastActivated = false,
            stack = me.zIndexStack,
            i = stack.length - 1,
            comp;

        // Go down through the z-index stack.
        // Activate the next visible one down.
        // Keep going down to find the next visible modal one to shift the modal mask down under
        for (; i >= 0; --i) {
            comp = stack[i];
            if (!comp.hidden) {
                if (!lastActivated) {
                    me._setActiveChild(comp);
                    lastActivated = true;
                }

                // Move any modal mask down to just under the next modal floater down the stack
                if (comp.modal) {
                    me._showModalMask(comp);
                    return;
                }
            }
        }

        // none to activate, so there must be no modal mask.
        // And clear the currently active property
        me._hideModalMask();
        if (!lastActivated) {
            me._setActiveChild(null);
        }
    },

    _showModalMask: function(comp) {
        var me = this,
            zIndex = comp.el.getStyle('zIndex') - 4,
            maskTarget = comp.floatParent ? comp.floatParent.getTargetEl() : Ext.get(comp.getEl().dom.parentNode),
            parentBox = maskTarget.getBox();

        if (!me.mask) {
            me.mask = Ext.getBody().createChild({
                cls: Ext.baseCSSPrefix + 'mask'
            });
            me.mask.setVisibilityMode(Ext.Element.DISPLAY);
            me.mask.on('click', me._onMaskClick, me);
        }
        if (maskTarget.dom === document.body) {
            parentBox.height = Ext.Element.getViewHeight();
        }
        maskTarget.addCls(Ext.baseCSSPrefix + 'body-masked');
        me.mask.setBox(parentBox);
        me.mask.setStyle('zIndex', zIndex);
        me.mask.show();
    },

    _hideModalMask: function() {
        var mask = this.mask;
        if (mask && mask.dom.parentNode) {
            Ext.get(mask.dom.parentNode).removeCls(Ext.baseCSSPrefix + 'body-masked');
            mask.hide();
        }
    },

    _onMaskClick: function() {
        if (this.front) {
            this.front.focus();
        }
    },

    _onContainerResize: function() {
        var mask = this.mask;
        if (mask && mask.isVisible()) {
            mask.setSize(Ext.get(mask.dom.parentNode).getViewSize(true));
        }
    },

    /**
     * <p>Registers a floating {@link Ext.Component} with this ZIndexManager. This should not
     * need to be called under normal circumstances. Floating Components (such as Windows, BoundLists and Menus) are automatically registered
     * with a {@link Ext.Component#zIndexManager zIndexManager} at render time.</p>
     * <p>Where this may be useful is moving Windows between two ZIndexManagers. For example,
     * to bring the Ext.MessageBox dialog under the same manager as the Desktop's
     * ZIndexManager in the desktop sample app:</p><code><pre>
MyDesktop.getDesktop().getManager().register(Ext.MessageBox);
</pre></code>
     * @param {Ext.Component} comp The Component to register.
     */
    register : function(comp) {
        var me = this;
        
        if (comp.zIndexManager) {
            comp.zIndexManager.unregister(comp);
        }
        comp.zIndexManager = me;

        me.list[comp.id] = comp;
        me.zIndexStack.push(comp);
        comp.on('hide', me._activateLast, me);
    },

    /**
     * <p>Unregisters a {@link Ext.Component} from this ZIndexManager. This should not
     * need to be called. Components are automatically unregistered upon destruction.
     * See {@link #register}.</p>
     * @param {Ext.Component} comp The Component to unregister.
     */
    unregister : function(comp) {
        var me = this,
            list = me.list;
        
        delete comp.zIndexManager;
        if (list && list[comp.id]) {
            delete list[comp.id];
            comp.un('hide', me._activateLast);
            Ext.Array.remove(me.zIndexStack, comp);

            // Destruction requires that the topmost visible floater be activated. Same as hiding.
            me._activateLast();
        }
    },

    /**
     * Gets a registered Component by id.
     * @param {String/Object} id The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component}
     */
    get : function(id) {
        return typeof id == "object" ? id : this.list[id];
    },

   /**
     * Brings the specified Component to the front of any other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance
     * @return {Boolean} True if the dialog was brought to the front, else false
     * if it was already in front
     */
    bringToFront : function(comp) {
        var me = this;
        
        comp = me.get(comp);
        if (comp !== me.front) {
            Ext.Array.remove(me.zIndexStack, comp);
            me.zIndexStack.push(comp);
            me.assignZIndices();
            return true;
        }
        if (comp.modal) {
            me._showModalMask(comp);
        }
        return false;
    },

    /**
     * Sends the specified Component to the back of other active Components in this ZIndexManager.
     * @param {String/Object} comp The id of the Component or a {@link Ext.Component} instance
     * @return {Ext.Component} The Component
     */
    sendToBack : function(comp) {
        var me = this;
        
        comp = me.get(comp);
        Ext.Array.remove(me.zIndexStack, comp);
        me.zIndexStack.unshift(comp);
        me.assignZIndices();
        return comp;
    },

    /**
     * Hides all Components managed by this ZIndexManager.
     */
    hideAll : function() {
        var list = this.list,
            item,
            id;
            
        for (id in list) {
            if (list.hasOwnProperty(id)) {
                item = list[id];
                if (item.isComponent && item.isVisible()) {
                    item.hide();
                }
            }
        }
    },

    /**
     * @private
     * Temporarily hides all currently visible managed Components. This is for when
     * dragging a Window which may manage a set of floating descendants in its ZIndexManager;
     * they should all be hidden just for the duration of the drag.
     */
    hide: function() {
        var i = 0,
            stack = this.zIndexStack,
            len = stack.length,
            comp;

        this.tempHidden = [];
        for (; i < len; i++) {
            comp = stack[i];
            if (comp.isVisible()) {
                this.tempHidden.push(comp);
                comp.hide();
            }
        }
    },

    /**
     * @private
     * Restores temporarily hidden managed Components to visibility.
     */
    show: function() {
        var i = 0,
            tempHidden = this.tempHidden,
            len = tempHidden ? tempHidden.length : 0,
            comp;

        for (; i < len; i++) {
            comp = tempHidden[i];
            comp.show();
            comp.setPosition(comp.x, comp.y);
        }
        delete this.tempHidden;
    },

    /**
     * Gets the currently-active Component in this ZIndexManager.
     * @return {Ext.Component} The active Component
     */
    getActive : function() {
        return this.front;
    },

    /**
     * Returns zero or more Components in this ZIndexManager using the custom search function passed to this method.
     * The function should accept a single {@link Ext.Component} reference as its only argument and should
     * return true if the Component matches the search criteria, otherwise it should return false.
     * @param {Function} fn The search function
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the Component being tested.
     * that gets passed to the function if not specified)
     * @return {Array} An array of zero or more matching windows
     */
    getBy : function(fn, scope) {
        var r = [],
            i = 0,
            stack = this.zIndexStack,
            len = stack.length,
            comp;

        for (; i < len; i++) {
            comp = stack[i];
            if (fn.call(scope||comp, comp) !== false) {
                r.push(comp);
            }
        }
        return r;
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * @param {Function} fn The function to execute for each item
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current Component in the iteration.
     */
    each : function(fn, scope) {
        var list = this.list,
            id,
            comp;
            
        for (id in list) {
            if (list.hasOwnProperty(id)) {
                comp = list[id];
                if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                    return;
                }
            }
        }
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the bottom and proceeding to the top.
     * @param {Function} fn The function to execute for each item
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachBottomUp: function (fn, scope) {
        var stack = this.zIndexStack,
            i = 0,
            len = stack.length,
            comp;

        for (; i < len; i++) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    /**
     * Executes the specified function once for every Component in this ZIndexManager, passing each
     * Component as the only parameter. Returning false from the function will stop the iteration.
     * The components are passed to the function starting at the top and proceeding to the bottom.
     * @param {Function} fn The function to execute for each item
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function
     * is executed. Defaults to the current Component in the iteration.
     */
    eachTopDown: function (fn, scope) {
        var stack = this.zIndexStack,
            i = stack.length,
            comp;

        for (; i-- > 0; ) {
            comp = stack[i];
            if (comp.isComponent && fn.call(scope || comp, comp) === false) {
                return;
            }
        }
    },

    destroy: function() {
        var me = this;
        
        me.each(function(c) {
            c.destroy();
        });
        delete me.zIndexStack;
        delete me.list;
        delete me.container;
        delete me.targetEl;
    }
}, function() {
    /**
     * @class Ext.WindowManager
     * @extends Ext.ZIndexManager
     * <p>The default global floating Component group that is available automatically.</p>
     * <p>This manages instances of floating Components which were rendered programatically without
     * being added to a {@link Ext.container.Container Container}, and for floating Components which were added into non-floating Containers.</p>
     * <p><i>Floating</i> Containers create their own instance of ZIndexManager, and floating Components added at any depth below
     * there are managed by that ZIndexManager.</p>
     * @singleton
     */
    Ext.WindowManager = Ext.WindowMgr = new this();
});
