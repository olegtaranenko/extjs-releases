/**
 * Used as a view by {@link Ext.tree.Panel TreePanel}.
 */
Ext.define('Ext.tree.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.treeview',

    requires: [
        'Ext.data.NodeStore'
    ],

    loadingCls: Ext.baseCSSPrefix + 'grid-tree-loading',
    expandedCls: Ext.baseCSSPrefix + 'grid-tree-node-expanded',
    leafCls: Ext.baseCSSPrefix + 'grid-tree-node-leaf',

    expanderSelector: '.' + Ext.baseCSSPrefix + 'tree-expander',
    checkboxSelector: '.' + Ext.baseCSSPrefix + 'tree-checkbox',
    expanderIconOverCls: Ext.baseCSSPrefix + 'tree-expander-over',

    // Class to add to the node wrap element used to hold nodes when a parent is being
    // collapsed or expanded. During the animation, UI interaction is forbidden by testing
    // for an ancestor node with this class.
    nodeAnimWrapCls: Ext.baseCSSPrefix + 'tree-animator-wrap',

    blockRefresh: true,

    /**
     * @cfg {Boolean}
     * @inheritdoc
     */
    loadMask: false,

    /**
     * @cfg {Boolean} rootVisible
     * False to hide the root node.
     */
    rootVisible: true,

    /**
     * @cfg {Boolean} deferInitialRefresh
     * Must be false for Tree Views because the root node must be rendered in order to be updated with its child nodes.
     */
    deferInitialRefresh: false,

    /**
     * @cfg {Boolean} animate
     * True to enable animated expand/collapse (defaults to the value of {@link Ext#enableFx Ext.enableFx})
     */

    expandDuration: 250,
    collapseDuration: 250,

    toggleOnDblClick: true,

    stripeRows: false,

    // fields that will trigger a change in the ui that aren't likely to be bound to a column
    uiFields: ['expanded', 'loaded', 'checked', 'expandable', 'leaf', 'icon', 'iconCls', 'loading', 'qtip', 'qtitle'],

    // treeRowTpl which is inserted into thwe rowTpl chain before the base rowTpl. Sets tree-specific classes and attributes
    treeRowTpl: [
        '{%',
            'this.processRowValues(values);',
            'this.nextTpl.applyOut(values, out, parent);',
        '%}', {
            priority: 10,
            processRowValues: function(rowValues) {
                var record = rowValues.record,
                    view = rowValues.view,
                    qtip = record.get('qtip'),
                    qtitle = record.get('qttle');

                rowValues.rowAttr = {};
                if (qtip) {
                    rowValues.rowAttr['data-qtip'] = qtip;
                }
                if (qtitle) {
                    rowValues.rowAttr['data-qtitle'] = qtitle;
                }
                if (record.isExpanded()) {
                    rowValues.rowClasses.push(view.expandedCls);
                }
                if (record.isLeaf()) {
                    rowValues.rowClasses.push(view.leafCls);
                }
                if (record.isLoading()) {
                    rowValues.rowClasses.push(view.loadingCls);
                }
            }
        }
    ],

    initComponent: function() {
        var me = this,
            treeStore = me.panel.getStore(),
            store = me.store;

        if (me.initialConfig.animate === undefined) {
            me.animate = Ext.enableFx;
        }

        if (!store || store === treeStore) {
            me.store = store = new Ext.data.NodeStore({
                treeStore: treeStore,
                recursive: true,
                rootVisible: me.rootVisible
            });
        }

        store.on({
            beforeexpand: me.onBeforeExpand,
            expand: me.onExpand,
            beforecollapse: me.onBeforeCollapse,
            collapse: me.onCollapse,
            write: me.onStoreWrite,
            datachanged: me.onStoreDataChanged,
            collapsestart: me.beginBulkUpdate,
            collapsecomplete: me.endBulkUpdate,
            scope: me
        });

        treeStore.on({
            scope: me,
            beforefill: me.onBeforeFill,
            fillcomplete: me.onFillComplete,
            beforebulkremove: me.beginBulkUpdate,
            bulkremovecomplete: me.endBulkUpdate
        });

        if (!treeStore.remoteSort) {
            // If we're local sorting, we don't want the view to be
            // continually updated during the sort process
            treeStore.on({
                scope: me,
                beforesort: me.onBeforeSort,
                sort: me.onSort
            });
        }

        if (me.node) {
            me.setRootNode(me.node);
        }
        me.animQueue = {};
        me.animWraps = {};
        me.addEvents(
            /**
             * @event afteritemexpand
             * Fires after an item has been visually expanded and is visible in the tree. 
             * @param {Ext.data.NodeInterface} node         The node that was expanded
             * @param {Number} index                        The index of the node
             * @param {HTMLElement} item                    The HTML element for the node that was expanded
             */
            'afteritemexpand',
            /**
             * @event afteritemcollapse
             * Fires after an item has been visually collapsed and is no longer visible in the tree. 
             * @param {Ext.data.NodeInterface} node         The node that was collapsed
             * @param {Number} index                        The index of the node
             * @param {HTMLElement} item                    The HTML element for the node that was collapsed
             */
            'afteritemcollapse',
            /**
             * @event nodedragover
             * Fires when a tree node is being targeted for a drag drop, return false to signal drop not allowed.
             * @param {Ext.data.NodeInterface} targetNode The target node
             * @param {String} position The drop position, "before", "after" or "append",
             * @param {Object} dragData Data relating to the drag operation
             * @param {Ext.EventObject} e The event object for the drag 
             */
            'nodedragover'
        );
        me.callParent(arguments);
        me.addRowTpl(Ext.XTemplate.getTpl(me, 'treeRowTpl'));
        me.on({
            element: 'el',
            scope: me,
            delegate: me.expanderSelector,
            mouseover: me.onExpanderMouseOver,
            mouseout: me.onExpanderMouseOut
        });
        me.on({
            element: 'el',
            scope: me,
            delegate: me.checkboxSelector,
            click: me.onCheckboxChange
        });
    },

    onBeforeFill: function(treeStore, fillRoot){
        var store = this.store,
            index = store.indexOf(fillRoot);

        // Filling a bunch of nodes, save the index of the root and the next sibling. When
        // the load is finished, the new records will be those that exist between the two.
        this.fillRootIndex = index;
        this.fillSibling = store.getAt(index + 1);
        store.suspendEvents();

    },

    onFillComplete: function(treeStore, fillRoot, newNodes){
        var me = this,
            store = me.store,
            start = me.fillRootIndex + 1,
            sibling = me.fillSibling,
            end, records;

        store.resumeEvents();
        delete me.fillSibling;
        delete me.fillRootIndex;

        // Always update the current node, since the load may be triggered
        // by .load() directly instead of .expand() on the node
        fillRoot.triggerUIUpdate();

        // In the cases of expand, the records might not be in the store yet,
        // so jump out early and expand will handle it later
        if (!newNodes.length || store.indexOf(newNodes[0]) === -1) {
            return;
        }

        if (sibling) {
            end = store.indexOf(sibling) - 1;
        } 

        records = store.getRange(start, end);
        me.onAdd(store, records, start);
        
        me.refreshPartner();
    },

    onBeforeSort: function() {
        this.store.suspendEvents(); 
    },

    onSort: function(o) {
        // The store will fire sort events for the nodes that bubble from the tree.
        // We only want the final one when sorting is completed, fired by the store
        if (o.isStore) {
            this.store.resumeEvents();
            this.refresh();
            this.refreshPartner();
        }
    },
    
    refreshPartner: function(){
        var partner = this.lockingPartner;
        if (partner) {
            partner.refresh();
        }
    },

    // Overridden from base class
    // TreeView uses the individual record remove event rather than the bulkremove
    getStoreListeners: function() {
        var me = this;
        return {
            refresh: me.onDataRefresh,
            add: me.onAdd,
            remove: me.onRemove,
            update: me.onUpdate,
            clear: me.refresh
        };
    },

    getMaskStore: function() {
        return this.panel.getStore();
    },

    afterComponentLayout: function() {
        this.callParent(arguments);
        var stretcher = this.stretcher;
        if (stretcher) {
            stretcher.setWidth((this.getWidth() - Ext.getScrollbarSize().width));
        }
    },

    processUIEvent: function(e) {
        // If the clicked node is part of an animation, ignore the click.
        // This is because during a collapse animation, the associated Records
        // will already have been removed from the Store, and the event is not processable.
        if (e.getTarget('.' + this.nodeAnimWrapCls, this.el)) {
            return false;
        }
        return this.callParent(arguments);
    },

    onClear: function() {
        this.store.removeAll();
    },

    setRootNode: function(node) {
        var me = this;
        me.store.setNode(node);
        me.node = node;
    },

    onCheckboxChange: function(e, t) {
        var me = this,
            item = e.getTarget(me.getItemSelector(), me.getTargetEl());

        if (item) {
            me.onCheckChange(me.getRecord(item));
        }
    },

    onCheckChange: function(record) {
        var checked = record.get('checked');
        if (Ext.isBoolean(checked)) {
            checked = !checked;
            record.set('checked', checked);
            this.fireEvent('checkchange', record, checked);
        }
    },

    getChecked: function() {
        var checked = [];
        this.node.cascadeBy(function(rec){
            if (rec.get('checked')) {
                checked.push(rec);
            }
        });
        return checked;
    },

    isItemChecked: function(rec) {
        return rec.get('checked');
    },

    /**
     * @private
     */
    createAnimWrap: function(record, index) {
        var me = this,
            node = me.getNode(record),
            tmpEl, nodeEl,
            columnSizer = [];

        me.renderColumnSizer(columnSizer);
        nodeEl = Ext.get(node);
        tmpEl = nodeEl.insertSibling({
            tag: 'tr',
            html: [
                '<td colspan="' + me.panel.headerCt.getColumnCount() + '">',
                    '<div class="' + me.nodeAnimWrapCls + '">',
                        // Table has to have correct classes to get sized by the dynamic CSS rules
                        '<table class="' + Ext.baseCSSPrefix + me.id + '-table ' + Ext.baseCSSPrefix + 'grid-table">',
                        columnSizer.join(''),
                        '<tbody></tbody></table>',
                    '</div>',
                '</td>'
            ].join('')
        }, 'after');

        return {
            record: record,
            node: node,
            el: tmpEl,
            expanding: false,
            collapsing: false,
            animating: false,
            animateEl: tmpEl.down('div'),
            targetEl: tmpEl.down('tbody')
        };
    },

    /**
     * @private
     * Returns the animation wrapper element for the specified parent node, used to wrap the child nodes as
     * they slide up or down during expand/collapse.
     *
     * @param parent The parent node to be expanded or collapsed
     *
     * @param [bubble=true] If the passed parent node does not already have a wrap element created, by default
     * this function will bubble up to each parent node looking for a valid wrap element to reuse, returning
     * the first one it finds. This is the appropriate behavior, e.g., for the collapse direction, so that the
     * entire expanded set of branch nodes can collapse as a single unit.
     *
     * However for expanding each parent node should instead always create its own animation wrap if one
     * doesn't exist, so that its children can expand independently of any other nodes -- this is crucial
     * when executing the "expand all" behavior. If multiple nodes attempt to reuse the same ancestor wrap
     * element concurrently during expansion it will lead to problems as the first animation to complete will
     * delete the wrap el out from under other running animations. For that reason, when expanding you should
     * always pass `bubble: false` to be on the safe side.
     *
     * If the passed parent has no wrap (or there is no valid ancestor wrap after bubbling), this function
     * will return null and the calling code should then call {@link #createAnimWrap} if needed.
     *
     * @return {Ext.Element} The wrapping element as created in {@link #createAnimWrap}, or null
     */
    getAnimWrap: function(parent, bubble) {
        if (!this.animate) {
            return null;
        }

        var wraps = this.animWraps,
            wrap = wraps[parent.internalId];

        if (bubble !== false) {
            while (!wrap && parent) {
                parent = parent.parentNode;
                if (parent) {
                    wrap = wraps[parent.internalId];
                }
            }
        }
        return wrap;
    },

    doAdd: function(records, index) {
        // If we are adding records which have a parent that is currently expanding
        // lets add them to the animation wrap
        var me = this,
            nodes = me.bufferRender(records, index, true),
            record = records[0],
            parent = record.parentNode,
            all = me.all,
            relativeIndex,
            animWrap = me.getAnimWrap(parent),
            targetEl, children, len;

        if (!animWrap || !animWrap.expanding) {
            return me.callParent(arguments);
        }

        // We need the parent that has the animWrap, not the node's parent
        parent = animWrap.record;

        // If there is an anim wrap we do our special magic logic
        targetEl = animWrap.targetEl;
        children = targetEl.dom.childNodes;
        len = children.length;

        // The relative index is the index in the full flat collection minus the index of the wraps parent
        relativeIndex = index - me.indexInStore(parent) - 1;

        // If we are adding records to the wrap that have a higher relative index then there are currently children
        // it means we have to append the nodes to the wrap
        if (!len || relativeIndex >= len) {
            targetEl.appendChild(nodes);
        }
        // If there are already more children then the relative index it means we are adding child nodes of
        // some expanded node in the anim wrap. In this case we have to insert the nodes in the right location
        else {
            Ext.fly(children[relativeIndex]).insertSibling(nodes, 'before', true);
        }

        // We also have to update the node cache of the DataView
        all.insert(index, nodes);

        // If we were in an animation we need to now change the animation
        // because the targetEl just got higher.
        if (animWrap.isAnimating) {
            me.onExpand(parent);
        }
    },

    beginBulkUpdate: function(){
        this.bulkUpdate = true;
    },

    endBulkUpdate: function(){
        var me = this;
        this.bulkUpdate = false;
        if (me.rendered) {
            me.refreshSize();
            me.updateIndexes();
        }
    },

    onRemove : function(ds, record, index) {
        var me = this,
            bulk = me.bulkUpdate,
            empty;

        if (me.viewReady) {
            me.doRemove(record, index);
            if (!bulk) {
                me.updateIndexes(index);
            }
            empty = me.store.getCount() === 0;
            if (empty){
                me.refresh();
            }
            me.fireEvent('itemremove', record, index);
            if (!bulk && !empty) {
                me.refreshSize();
            }
        }
    },

    doRemove: function(record, index) {
        // If we are adding records which have a parent that is currently expanding
        // lets add them to the animation wrap
        var me = this,
            all = me.all,
            animWrap = me.getAnimWrap(record),
            item = all.item(index),
            node = item ? item.dom : null;

        if (!node || !animWrap || !animWrap.collapsing) {
            return me.callParent(arguments);
        }

        animWrap.targetEl.appendChild(node);
        all.removeElement(index);
    },

    onBeforeExpand: function(parent, records, index) {
        var me = this,
            animWrap;

        if (!me.rendered || !me.animate) {
            return;
        }

        if (me.getNode(parent)) {
            animWrap = me.getAnimWrap(parent, false);
            if (!animWrap) {
                animWrap = me.animWraps[parent.internalId] = me.createAnimWrap(parent);
                animWrap.animateEl.setHeight(0);
            }
            else if (animWrap.collapsing) {
                // If we expand this node while it is still expanding then we
                // have to remove the nodes from the animWrap.
                animWrap.targetEl.select(me.itemSelector).remove();
            }
            animWrap.expanding = true;
            animWrap.collapsing = false;
        }
    },

    onExpand: function(parent) {
        var me = this,
            queue = me.animQueue,
            id = parent.getId(),
            node = me.getNode(parent),
            index = node ? me.indexOf(node) : -1,
            animWrap,
            animateEl,
            targetEl;

        if (me.singleExpand) {
            me.ensureSingleExpand(parent);
        }

        // The item is not visible yet
        if (index === -1) {
            return;
        }

        animWrap = me.getAnimWrap(parent, false);

        if (!animWrap) {
            parent.isExpandingOrCollapsing = false;
            me.fireEvent('afteritemexpand', parent, index, node);
            me.refreshSize();
            return;
        }

        animateEl = animWrap.animateEl;
        targetEl = animWrap.targetEl;

        animateEl.stopAnimation();
        // @TODO: we are setting it to 1 because quirks mode on IE seems to have issues with 0
        queue[id] = true;
        animateEl.animate({
            from: {
                height: 0
            },
            to: {
                height: targetEl.getHeight()
            },
            duration: me.expandDuration,
            listeners: {
                afteranimate: function() {
                    // Move all the nodes out of the anim wrap to their proper location
                    // Must do this in afteranimate because lastframe does not fire if the
                    // animation is stopped.
                    var items = targetEl.query(me.itemSelector);
                    if (items.length) {
                        animWrap.el.insertSibling(items, 'before', true);
                    }
                    animWrap.el.remove();
                    me.refreshSize();
                    delete me.animWraps[animWrap.record.internalId];
                    delete queue[id];
                }
            },
            callback: function() {
                parent.isExpandingOrCollapsing = false;
                me.fireEvent('afteritemexpand', parent, index, node);
            }
        });

        animWrap.isAnimating = true;
    },

    onBeforeCollapse: function(parent, records, index) {
        var me = this,
            animWrap;

        if (!me.rendered || !me.animate) {
            return;
        }

        if (me.getNode(parent)) {
            animWrap = me.getAnimWrap(parent);
            if (!animWrap) {
                animWrap = me.animWraps[parent.internalId] = me.createAnimWrap(parent, index);
            }
            else if (animWrap.expanding) {
                // If we collapse this node while it is still expanding then we
                // have to remove the nodes from the animWrap.
                animWrap.targetEl.select(this.itemSelector).remove();
            }
            animWrap.expanding = false;
            animWrap.collapsing = true;
        }
    },

    onCollapse: function(parent) {
        var me = this,
            queue = me.animQueue,
            id = parent.getId(),
            node = me.getNode(parent),
            index = node ? me.indexOf(node) : -1,
            animWrap = me.getAnimWrap(parent),
            animateEl;

        // The item has already been removed by a parent node
        if (index === -1) {
            return;
        }

        if (!animWrap) {
            parent.isExpandingOrCollapsing = false;
            me.fireEvent('afteritemcollapse', parent, index, node);
            me.refreshSize();
            return;
        }

        animateEl = animWrap.animateEl;

        queue[id] = true;

        // @TODO: we are setting it to 1 because quirks mode on IE seems to have issues with 0
        animateEl.stopAnimation();
        animateEl.animate({
            to: {
                height:0
            },
            duration: me.collapseDuration,
            listeners: {
                afteranimate: function() {
                    // Must do this in afteranimate because lastframe does not fire if the animation is stopped.
                    animWrap.el.remove();
                    me.refreshSize();
                    delete me.animWraps[animWrap.record.internalId];
                    delete queue[id];
                }
            },
            callback: function() {
                parent.isExpandingOrCollapsing = false;
                me.fireEvent('afteritemcollapse', parent, index, node);
            }
        });
        animWrap.isAnimating = true;
    },

    /**
     * Checks if a node is currently undergoing animation
     * @private
     * @param {Ext.data.Model} node The node
     * @return {Boolean} True if the node is animating
     */
    isAnimating: function(node) {
        return !!this.animQueue[node.getId()];
    },

    /**
     * Expands a record that is loaded in the view.
     *
     * If an animated collapse or expand of the record is in progress, this call will be ignored.
     * @param {Ext.data.Model} record The record to expand
     * @param {Boolean} [deep] True to expand nodes all the way down the tree hierarchy.
     * @param {Function} [callback] The function to run after the expand is completed
     * @param {Object} [scope] The scope of the callback function.
     */
    expand: function(record, deep, callback, scope) {
        var me = this,
            doAnimate = !!me.animate;

        // Block toggling if we are already animating an expand or collapse operation.
        if (!doAnimate || !record.isExpandingOrCollapsing) {
            if (!record.isLeaf()) {
                record.isExpandingOrCollapsing = doAnimate;
            }
            return record.expand(deep, callback, scope);
        }
    },

    /**
     * Collapses a record that is loaded in the view.
     *
     * If an animated collapse or expand of the record is in progress, this call will be ignored.
     * @param {Ext.data.Model} record The record to collapse
     * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
     * @param {Function} [callback] The function to run after the collapse is completed
     * @param {Object} [scope] The scope of the callback function.
     */
    collapse: function(record, deep, callback, scope) {
        var me = this,
            doAnimate = !!me.animate;

        // Block toggling if we are already animating an expand or collapse operation.
        if (!doAnimate || !record.isExpandingOrCollapsing) {
            if (!record.isLeaf()) {
                record.isExpandingOrCollapsing = doAnimate;
            }
            return record.collapse(deep, callback, scope);
        }
    },

    /**
     * Toggles a record between expanded and collapsed.
     *
     * If an animated collapse or expand of the record is in progress, this call will be ignored.
     * @param {Ext.data.Model} record
     * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
     * @param {Function} [callback] The function to run after the expand/collapse is completed
     * @param {Object} [scope] The scope of the callback function.
     */
    toggle: function(record, deep, callback, scope) {
        if (record.isExpanded()) {
            this.collapse(record, deep, callback, scope);
        } else {
            this.expand(record, deep, callback, scope);
        }
    },

    onItemDblClick: function(record, item, index) {
        var me = this,
            editingPlugin = me.editingPlugin;
            
        me.callParent(arguments);
        if (me.toggleOnDblClick && record.isExpandable() && !(editingPlugin && editingPlugin.clicksToEdit === 2)) {
            me.toggle(record);
        }
    },

    onBeforeItemMouseDown: function(record, item, index, e) {
        if (e.getTarget(this.expanderSelector, item)) {
            return false;
        }
        return this.callParent(arguments);
    },

    onItemClick: function(record, item, index, e) {
        if (e.getTarget(this.expanderSelector, item) && record.isExpandable()) {
            this.toggle(record, e.ctrlKey);
            return false;
        }
        return this.callParent(arguments);
    },

    onExpanderMouseOver: function(e, t) {
        e.getTarget(this.cellSelector, 10, true).addCls(this.expanderIconOverCls);
    },

    onExpanderMouseOut: function(e, t) {
        e.getTarget(this.cellSelector, 10, true).removeCls(this.expanderIconOverCls);
    },

    /**
     * Gets the base TreeStore from the bound TreePanel.
     */
    getTreeStore: function() {
        return this.panel.store;
    },

    ensureSingleExpand: function(node) {
        var parent = node.parentNode;
        if (parent) {
            parent.eachChild(function(child) {
                if (child !== node && child.isExpanded()) {
                    child.collapse();
                }
            });
        }
    },

    shouldUpdateCell: function(column, changedFieldNames){
        if (changedFieldNames) {
            var i = 0,
                len = changedFieldNames.length;

            for (; i < len; ++i) {
                if (Ext.Array.contains(this.uiFields, changedFieldNames[i])) {
                    return true;
                }
            }
        }
        return this.callParent(arguments);
    },

    /**
     * Re-fires the NodeStore's "write" event as a TreeStore event
     * @private
     * @param {Ext.data.NodeStore} store
     * @param {Ext.data.Operation} operation
     */
    onStoreWrite: function(store, operation) {
        var treeStore = this.panel.store;
        treeStore.fireEvent('write', treeStore, operation);
    },

    /**
     * Re-fires the NodeStore's "datachanged" event as a TreeStore event
     * @private
     * @param {Ext.data.NodeStore} store
     * @param {Ext.data.Operation} operation
     */
    onStoreDataChanged: function(store, operation) {
        var treeStore = this.panel.store;
        treeStore.fireEvent('datachanged', treeStore);
    }
});
