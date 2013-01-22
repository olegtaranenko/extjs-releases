/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-01-08 23:25:56 (f0a3d96f987988f3e7bc5b0c0a7355723a686090)
*/


Ext.define('Ext.Neptune.button.Button', {
	override: 'Ext.button.Button',
	
    setScale: function(scale) {
        this.callParent(arguments);

        this.removeCls(this.allowedScales);
        this.addCls(scale);
    }
});











Ext.define('Ext.Neptune.container.ButtonGroup', {
	override: 'Ext.container.ButtonGroup',
	
    beforeRender: function() {
        var me = this;

        me.callParent();

        
        if (me.header) {
            
            delete me.header.items.items[0].flex;
        }

        me.callParent(arguments);
    }
});

Ext.define('Ext.Neptune.layout.component.field.Trigger', {
	override: 'Ext.layout.component.field.Trigger',
	
    sizeBodyContents: function(width, height, ownerContext) {
        var me = this,
            owner = me.owner,
            triggerWidth = owner.getTriggerWidth();

        
        
        if (owner.hideTrigger || owner.readOnly || triggerWidth > 0) {
            ownerContext.inputContext.setProp('width', width, true);
        }
	}
});

Ext.define('Ext.Neptune.menu.Menu', {
	override: 'Ext.menu.Menu',
	
    baseCls: Ext.baseCSSPrefix + 'menu',

	initComponent: function() {
        var me = this;

        me.addEvents(
            
            'click',

            
            'mouseenter',

            
            'mouseleave',

            
            'mouseover'
        );

        Ext.menu.Manager.register(me);

        
        if (me.plain) {
            me.cls = Ext.baseCSSPrefix + 'menu-plain';
        }

        
        
        
        
        if (!me.layout) {
            me.layout = {
                type: 'vbox',
                align: 'stretchmax',
                overflowHandler: 'Scroller'
            };
            
            if (!me.floating) {
                me.layout.align = 'stretch';
            }
        }

        
        if (me.floating === false && me.initialConfig.hidden !== true) {
            me.hidden = false;
        }

        me.callParent(arguments);

        me.on('beforeshow', function() {
            var hasItems = !!me.items.length;
            
            
            
            if (hasItems && me.rendered) {
                me.el.setStyle('visibility', null);
            }
            return hasItems;
        });
    }
});

Ext.define('Ext.Neptune.panel.Tool', {
	override: 'Ext.panel.Tool',
	
    renderTpl: ['<div id="{id}-toolEl" class="{baseCls}-{type}" role="presentation"></div>']
});

Ext.define('Ext.Neptune.window.MessageBox', {
	override: 'Ext.window.MessageBox',
	
	initComponent: function() {
        var me = this,
            i, button;

        me.title = '&#160;';

        me.topContainer = new Ext.container.Container({
            anchor: '100%',
            style: {
                padding: '10px',
                overflow: 'hidden'
            },
            items: [
                me.iconComponent = new Ext.Component({
                    cls: me.baseCls + '-icon',
                    width: 50,
                    height: me.iconHeight,
                    style: {
                        'float': 'left'
                    }
                }),
                me.promptContainer = new Ext.container.Container({
                    layout: {
                        type: 'anchor'
                    },
                    items: [
                        me.msg = new Ext.Component({
                            autoEl: { tag: 'span' },
                            cls: me.baseCls + '-text'
                        }),
                        me.textField = new Ext.form.field.Text({
                            anchor: '100%',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: me.onPromptKey,
                                scope: me
                            }
                        }),
                        me.textArea = new Ext.form.field.TextArea({
                            anchor: '100%',
                            height: 75
                        })
                    ]
                })
            ]
        });
        me.progressBar = new Ext.ProgressBar({
            anchor: '-10',
            style: 'margin-left:10px'
        });

        me.items = [me.topContainer, me.progressBar];

        
        me.msgButtons = [];
        for (i = 0; i < 4; i++) {
            button = me.makeButton(i);
            me.msgButtons[button.itemId] = button;
            me.msgButtons.push(button);
        }
        me.bottomTb = new Ext.toolbar.Toolbar({
            ui: 'footer',
            dock: 'bottom',
            layout: {
                pack: 'end'
            },
            items: [
                me.msgButtons[0],
                me.msgButtons[1],
                me.msgButtons[2],
                me.msgButtons[3]
            ]
        });
        me.dockedItems = [me.bottomTb];

        me.callParent();
    }
});

Ext.define('Ext.Neptune.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    initComponent: function() {
        var me = this,
            i,
            len,
            item;

        if (Ext.isDefined(me.header)) {
            me.text = me.header;
            delete me.header;
        }

        
        
        
        if (me.flex) {
            me.minWidth = me.minWidth || Ext.grid.plugin.HeaderResizer.prototype.minColWidth;
        }

        if (!me.triStateSort) {
            me.possibleSortStates.length = 2;
        }

        
        if (Ext.isDefined(me.columns)) {
            me.isGroupHeader = true;

            
            if (me.dataIndex) {
                Ext.Error.raise('Ext.grid.column.Column: Group header may not accept a dataIndex');
            }
            if ((me.width && me.width !== Ext.grid.header.Container.prototype.defaultWidth) || me.flex) {
                Ext.Error.raise('Ext.grid.column.Column: Group header does not support setting explicit widths or flexs. The group header width is calculated by the sum of its children.');
            }
            

            
            me.items = me.columns;
            delete me.columns;
            delete me.flex;
            delete me.width;
            me.cls = (me.cls||'') + ' ' + Ext.baseCSSPrefix + 'group-header';
            me.sortable = false;
            me.resizable = false;
            me.align = 'center';
        } else {
            
            
            me.isContainer = false;
        }

        me.addCls(Ext.baseCSSPrefix + 'column-header-align-' + me.align);

        if (me.sortable) {
            me.addCls(Ext.baseCSSPrefix + 'column-header-sortable');
        }

        
		Ext.grid.column.Column.superclass.initComponent.call(this, arguments);

        me.on({
            element:  'el',
            click:    me.onElClick,
            dblclick: me.onElDblClick,
            scope:    me
        });
        me.on({
            element:    'titleEl',
            mouseenter: me.onTitleMouseOver,
            mouseleave: me.onTitleMouseOut,
            scope:      me
        });
    }
});

Ext.define('Ext.Neptune.Shadow', {
    override: 'Ext.Shadow',

    offset: 3
});

















































































































































































































































































































Ext.define('Ext.Neptune.resizer.Splitter', {
    override: 'Ext.resizer.Splitter',

    onRender: function() {
        var me = this;

        me.callParent(arguments);

        
        if (me.performCollapse !== false) {
            if (me.renderData.collapsible) {
                me.mon(me.collapseEl, 'click', me.toggleTargetCmp, me);
            }
            if (me.collapseOnDblClick) {
                me.mon(me.el, 'dblclick', me.toggleTargetCmp, me);
            }
        }

        
        me.mon(me.getCollapseTarget(), {
            collapse: me.onTargetCollapse,
            expand: me.onTargetExpand,
            scope: me
        });

        me.mon(me.el, 'mouseover', me.onMouseOver, me);
        me.mon(me.el, 'mouseout', me.onMouseOut, me);

        me.el.unselectable();
        me.tracker = Ext.create(me.getTrackerConfig());

        
        me.relayEvents(me.tracker, [ 'beforedragstart', 'dragstart', 'dragend' ]);
    },

    onMouseOver: function() {
        this.el.addCls(this.baseCls + '-over');
    },

    onMouseOut: function() {
        this.el.removeCls(this.baseCls + '-over');
    }
});

Ext.define('Ext.Neptune.tree.Panel', {
    override: 'Ext.tree.Panel',

    initComponent: function() {
        var me = this,
            cls = [me.treeCls],
            view;

        if (me.useArrows) {
            cls.push(Ext.baseCSSPrefix + 'tree-arrows');
        } else {
            cls.push(Ext.baseCSSPrefix + 'tree-no-arrows');
        }

        if (me.lines) {
            cls.push(Ext.baseCSSPrefix + 'tree-lines');
        } else {
            cls.push(Ext.baseCSSPrefix + 'tree-no-lines');
        }

        if (Ext.isString(me.store)) {
            me.store = Ext.StoreMgr.lookup(me.store);
        } else if (!me.store || Ext.isObject(me.store) && !me.store.isStore) {
            me.store = new Ext.data.TreeStore(Ext.apply({}, me.store || {}, {
                root: me.root,
                fields: me.fields,
                model: me.model,
                folderSort: me.folderSort
            }));
        } else if (me.root) {
            me.store = Ext.data.StoreManager.lookup(me.store);
            me.store.setRootNode(me.root);
            if (me.folderSort !== undefined) {
                me.store.folderSort = me.folderSort;
                me.store.sort();
            }
        }

        
        
        
        

        me.viewConfig = Ext.applyIf(me.viewConfig || {}, {
            rootVisible: me.rootVisible,
            animate: me.enableAnimations,
            singleExpand: me.singleExpand,
            node: me.store.getRootNode(),
            hideHeaders: me.hideHeaders
        });

        me.mon(me.store, {
            scope: me,
            rootchange: me.onRootChange,
            clear: me.onClear
        });

        me.relayEvents(me.store, [
            
            'beforeload',

            
            'load'
        ]);

        me.store.on({
            
            append: me.createRelayer('itemappend'),

            
            remove: me.createRelayer('itemremove'),

            
            move: me.createRelayer('itemmove'),

            
            insert: me.createRelayer('iteminsert'),

            
            beforeappend: me.createRelayer('beforeitemappend'),

            
            beforeremove: me.createRelayer('beforeitemremove'),

            
            beforemove: me.createRelayer('beforeitemmove'),

            
            beforeinsert: me.createRelayer('beforeiteminsert'),

            
            expand: me.createRelayer('itemexpand'),

            
            collapse: me.createRelayer('itemcollapse'),

            
            beforeexpand: me.createRelayer('beforeitemexpand'),

            
            beforecollapse: me.createRelayer('beforeitemcollapse')
        });

        
        if (!me.columns) {
            if (me.initialConfig.hideHeaders === undefined) {
                me.hideHeaders = true;
            }
            me.autoWidth = true;
            me.addCls(Ext.baseCSSPrefix + 'autowidth-table');
            me.columns = [{
                xtype    : 'treecolumn',
                text     : 'Name',
                width    : Ext.isIE6 ? null : 10000,
                dataIndex: me.displayField
            }];
        }

        if (me.cls) {
            cls.push(me.cls);
        }
        
        me.cls = cls.join(' ');
        Ext.tree.Panel.superclass.initComponent.apply(me, arguments);
        
        me.selModel.treeStore = me.store;
        
        view = me.getView();

        
        
        if (Ext.isIE6 && me.autoWidth) {
            view.afterRender = Ext.Function.createSequence(view.afterRender, function() {
                this.stretcher = view.el.down('th').createChild({style:"height:0px;width:" + (this.getWidth() - Ext.getScrollbarSize().width) + "px"});
            });
            view.afterComponentLayout = Ext.Function.createSequence(view.afterComponentLayout, function() {
                this.stretcher.setWidth((this.getWidth() - Ext.getScrollbarSize().width));
            });
        }

        me.relayEvents(view, [
            
            'checkchange',
            
            'afteritemexpand',
            
            'afteritemcollapse'
        ]);

        
        if (!view.rootVisible && !me.getRootNode()) {
            me.setRootNode({
                expanded: true
            });
        }
    }
});
