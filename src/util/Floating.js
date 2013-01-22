/**
 * A mixin to add floating capability to a Component.
 */
Ext.define('Ext.util.Floating', {

    uses: ['Ext.Layer', 'Ext.window.Window'],

    /**
     * @cfg {Boolean} focusOnToFront
     * Specifies whether the floated component should be automatically {@link Ext.Component#method-focus focused} when
     * it is {@link #toFront brought to the front}.
     */
    focusOnToFront: true,

    /**
     * @cfg {String/Boolean} shadow
     * Specifies whether the floating component should be given a shadow. Set to true to automatically create an
     * {@link Ext.Shadow}, or a string indicating the shadow's display {@link Ext.Shadow#mode}. Set to false to
     * disable the shadow.
     */
    shadow: 'sides',

    /**
     * @cfg {Number} shadowOffset
     * Number of pixels to offset the shadow.
     */

    constructor: function (dom) {
        var me = this;

        me.el = new Ext.Layer(Ext.apply({
            hideMode     : me.hideMode,
            hidden       : me.hidden,
            shadow       : (typeof me.shadow != 'undefined') ? me.shadow : 'sides',
            shadowOffset : me.shadowOffset,
            constrain    : false,
            shim         : (me.shim === false) ? false : undefined
        }, me.floating), dom);

        // If modal, and focus navigation not being handled by the FocusManager,
        // catch tab navigation, and loop back in on tab off first or last item.
        if (me.modal && !(Ext.FocusManager && Ext.FocusManager.enabled)) {
            me.el.on({
                keydown: me.onKeyDown,
                scope: me
            });
        }

        // release config object (if it was one)
        me.floating = true;

        // Register with the configured ownerCt.
        // With this we acquire a floatParent for relative positioning, and a zIndexParent which is an
        // ancestor floater which provides zIndex management.
        me.registerWithOwnerCt();

        me.initHierarchyEvents();
    },

    initHierarchyEvents: function() {
        var me = this,
            syncHidden = this.syncHidden;

        if (!me.hasHierarchyEventListeners) {
            me.mon(me.hierarchyEventSource, {
                hide: syncHidden,
                collapse: syncHidden,
                show: syncHidden,
                expand: syncHidden,
                added: syncHidden,
                scope: me
            });
            me.hasHierarchyEventListeners = true;
        }
    },

    registerWithOwnerCt: function() {
        var me = this,
            ownerCt = me.ownerCt;

        if (me.zIndexParent) {
            me.zIndexParent.unregisterFloatingItem(me);
        }

        // Acquire a zIndexParent by traversing the ownerCt axis for the nearest floating ancestor.
        // This is to find a base which can allocate relative z-index values
        me.zIndexParent = me.up('[floating]');

        // Set the floatParent to the ownertCt if one has been provided.
        // Otherwise use the zIndexParent.
        // Developers must only use ownerCt if there is really a containing relationship.
        me.setFloatParent(ownerCt || me.zIndexParent);
        delete me.ownerCt;

        if (me.zIndexParent) {
            me.zIndexParent.registerFloatingItem(me);
        } else {
            Ext.WindowManager.register(me);
        }
    },

    // Listen for TAB events and wrap round if tabbing of either end of the Floater
    onKeyDown: function(e) {
        var me = this,
            shift,
            focusables,
            first,
            last;

        // If tabbing off either end, wrap round
        if (e.getKey() == Ext.EventObject.TAB) {
            shift = e.shiftKey;
            focusables = me.el.query(':focusable');
            first = focusables[0];
            last = focusables[focusables.length - 1];
            if (first && last && e.target === (shift ? first : last)) {
                e.stopEvent();
                (shift ? last : first).focus(false, true);
            }
        }
    },

    setFloatParent: function(floatParent) {
        var me = this;

        me.floatParent = floatParent;

        // If a floating Component is configured to be constrained, but has no configured
        // constrainTo setting, set its constrainTo to be it's ownerCt before rendering.
        if ((me.constrain || me.constrainHeader) && !me.constrainTo) {
            me.constrainTo = floatParent ? floatParent.getTargetEl() : me.container;
        }
    },
    
    onAfterFloatLayout: function(){
        this.syncShadow();   
    },

    /**
     * synchronizes the hidden state of this component with the state of its hierarchy
     * @private
     */
    syncHidden: function() {
        var me = this,
            hidden = me.hidden || !me.rendered,
            hierarchicallyHidden = me.hierarchicallyHidden = me.isHierarchicallyHidden(),
            pendingShow = me.pendingShow;

        if (hidden !== hierarchicallyHidden) {
            if (hierarchicallyHidden) {
                me.hide();
                me.pendingShow = true;
            } else if (pendingShow) {
                delete me.pendingShow;
                if (pendingShow.length) {
                    me.show.apply(me, pendingShow);
                } else {
                    me.show();
                }
            }
        }
    },

    // @private
    // z-index is managed by the zIndexManager and may be overwritten at any time.
    // Returns the next z-index to be used.
    // If this is a Container, then it will have rebased any managed floating Components,
    // and so the next available z-index will be approximately 10000 above that.
    setZIndex: function(index) {
        var me = this;

        me.el.setZIndex(index);

        // Next item goes 10 above;
        index += 10;

        // When a Container with floating descendants has its z-index set, it rebases any floating descendants it is managing.
        // The returned value is a round number approximately 10000 above the last z-index used.
        if (me.floatingDescendants) {
            index = Math.floor(me.floatingDescendants.setBase(index) / 100) * 100 + 10000;
        }
        return index;
    },

    /**
     * Moves this floating Component into a constrain region.
     *
     * By default, this Component is constrained to be within the container it was added to, or the element it was
     * rendered to.
     *
     * An alternative constraint may be passed.
     * @param {String/HTMLElement/Ext.Element/Ext.util.Region} [constrainTo] The Element or {@link Ext.util.Region Region}
     * into which this Component is to be constrained. Defaults to the element into which this floating Component
     * was rendered.
     */
    doConstrain: function(constrainTo) {
        var me = this,
            // Calculate the constrained poition.
            // calculateConstrainedPosition will provide a default constraint
            // region if there is no explicit constrainTo, *and* there is no floatParent owner Component.
            xy = me.calculateConstrainedPosition(null, null, true);

        // false is returned if no movement is needed
        if (xy) {
            me.setPosition(xy);
        }
    },

    /**
     * Brings this floating Component to the front of any other visible, floating Components managed by the same
     * {@link Ext.ZIndexManager ZIndexManager}
     *
     * If this Component is modal, inserts the modal mask just below this Component in the z-index stack.
     *
     * @param {Boolean} [preventFocus=false] Specify `true` to prevent the Component from being focused.
     * @return {Ext.Component} this
     */
    toFront: function(preventFocus) {
        var me = this;

        // Find the floating Component which provides the base for this Component's zIndexing.
        // That must move to front to then be able to rebase its zIndex stack and move this to the front
        if (me.zIndexParent && me.bringParentToFront !== false) {
            me.zIndexParent.toFront(true);
        }

        if (!Ext.isDefined(preventFocus)) {
            preventFocus = !me.focusOnToFront;
        }

        if (preventFocus) {
            me.preventFocusOnActivate = true;
        }
        if (me.zIndexManager.bringToFront(me, preventFocus)) {    
            if (!preventFocus) {
                // Kick off a delayed focus request.
                // If another floating Component is toFronted before the delay expires
                // this will not receive focus.
                me.focus(false, true);
            }
        }
        delete me.preventFocusOnActivate;
        return me;
    },

    /**
     * This method is called internally by {@link Ext.ZIndexManager} to signal that a floating Component has either been
     * moved to the top of its zIndex stack, or pushed from the top of its zIndex stack.
     *
     * If a _Window_ is superceded by another Window, deactivating it hides its shadow.
     *
     * This method also fires the {@link Ext.Component#activate activate} or
     * {@link Ext.Component#deactivate deactivate} event depending on which action occurred.
     *
     * @param {Boolean} [active=false] True to activate the Component, false to deactivate it.
     * @param {Ext.Component} [newActive] The newly active Component which is taking over topmost zIndex position.
     */
    setActive: function(active, newActive) {
        var me = this;
        
        if (active) {
            if (me.el.shadow && !me.maximized) {
                me.el.enableShadow(true);
            }
            if (me.modal && !me.preventFocusOnActivate) {
                me.focus(false, true);
            }
            me.fireEvent('activate', me);
        } else {
            // Only the *Windows* in a zIndex stack share a shadow. All other types of floaters
            // can keep their shadows all the time
            if (me.isWindow && (newActive && newActive.isWindow) && me.hideShadowOnDeactivate) {
                me.el.disableShadow();
            }
            me.fireEvent('deactivate', me);
        }
    },

    /**
     * Sends this Component to the back of (lower z-index than) any other visible windows
     * @return {Ext.Component} this
     */
    toBack: function() {
        this.zIndexManager.sendToBack(this);
        return this;
    },

    /**
     * Center this Component in its container.
     * @return {Ext.Component} this
     */
    center: function() {
        var me = this,
            xy;
            
        if (me.isVisible()) {
            xy = me.getAlignToXY(me.container, 'c-c');
            me.setPagePosition(xy);
        } else {
            me.needsCenter = true;
        }
        return me;
    },
    
    onFloatShow: function() {
        if (this.needsCenter) {
            this.center();    
        }
        delete this.needsCenter;
    },

    // @private
    syncShadow : function() {
        if (this.floating) {
            this.el.sync(true);
        }
    },

    // @private
    fitContainer: function(animate) {
        var me = this,
            parent = me.floatParent,
            container = parent ? parent.getTargetEl() : me.container,
            newBox = container.getViewSize(false),
            newPosition = parent || (container.dom !== document.body) ?
                // If we are a contained floater, or rendered to a div, maximized position is (0,0)
                [0, 0] :
                // If no parent and rendered to body, align with origin of container el.
                container.getXY();

        newBox.x = newPosition[0];
        newBox.y = newPosition[1];
        me.setBox(newBox, animate);
    }
});
