Ext.Loader.setPath({
    'Ext.ux': '../ux/',
    'Ext.lan': './',
    'PerfCon': '../perf'
});

Ext.require([
    'Ext.data.*',
    'Ext.tree.*',
    'Ext.container.Viewport',
    'Ext.layout.container.Border',
    'Ext.lan.models.LayoutTreeNode',
    'Ext.History',
    'PerfCon.Console',
    'Ext.tab.Panel',
    'Ext.grid.column.Action',
    'Ext.form.field.TextArea',
    'Ext.form.field.Number',
    'Ext.toolbar.TextItem'
]);

Ext.define('Ext.lan.PageAnalyzer', {
    statsGatherCount: 0,

    layoutTpl: [
        '<tpl if="isBoxParent">',
            '<img class="x-tree-icon" src="resources/images/boxParent.gif">',
        '</tpl>',
        '{name:this.encode}',
        {
            encode: function (value) {
                return Ext.htmlEncode(value);
            }
        }
    ],

    runTpl: [
        'Run #{num} ({duration/1000} sec @ {time:this.date})',
        {
            date: function (value) {
                return Ext.Date.format(value, "Y-m-d H:i:s");
            }
        }
    ],

    triggerTpl: [
        '<div class="lan-{[values.missing ? "missing" : "available"]}-value">',
            '{name} (={[String(values.value) || "?"]}) - dirty: {dirty} - setBy: {setBy:this.encode}',
        '</div>',
        {
            encode: function (value) {
                return Ext.htmlEncode(value);
            }
        }
    ],

    constructor: function (config) {
        var me = this;

        Ext.apply(me, config);

        me.runNumber = 0;
        me.viewport = Ext.widget(me.createViewport());

        me.eraseCookieBtn = me.viewport.down('#eraseCookieBtn');
        me.rawDataTextArea = me.viewport.down('#rawDataTextArea');
        me.reloadBtn = me.viewport.down('#reloadBtn');
        me.stateText = me.viewport.down('#stateText');

        if (me.target) {
            setInterval(function () {
                me.updateConnectedState();
            }, 25);
        } else {
            me.eraseCookieBtn.setDisabled(true);
            me.reloadBtn.setDisabled(true);
        }

        me.updateConnectedState();
    },

    createDetails: function () {
        return {
            title: 'Details',
            xtype: 'tabpanel',
            tabPosition: 'bottom',
            height: '20%',
            split: true,
            collapsible: true,
            region: 'south',
            items: [{
                title: 'Raw Data',
                layout: 'fit',
                items: [{
                    xtype: 'textarea',
                    selectOnFocus: true,
                    itemId: 'rawDataTextArea'
                }]
            }, {
                title: 'Log',
                html: 'Under construction'
            }]
        };
    },

    createLayoutTree: function () {
        var store = new Ext.data.TreeStore({
                proxy: 'memory',
                model: 'Ext.lan.models.LayoutTreeNode'
            }),
            tree = {
                xtype: 'treepanel',
                store: store,
                rootVisible: false,
                useArrows: true,
                title: 'Layouts',
                region: 'center',
                viewConfig: {
                    getRowClass: function (record) {
                        return 'lan-' + record.data.type;
                    }
                },
                columns: [
                    {
                        xtype: 'treecolumn',
                        text: 'Layout',
                        flex: 1,
                        hideable: false,
                        draggable: false,
                        dataIndex: 'text'
                    },
                    {
                        text: 'Triggers',
                        width: 325,
                        dataIndex: 'triggers'
                    },
                    {
                        text: 'Blocks',
                        width: 250,
                        hidden: true,
                        dataIndex: 'blocks',
                        id: 'blocksCol'
                    },
                    {
                        text: 'Width',
                        width: 90,
                        dataIndex: 'widthModel'
                    },
                    {
                        text: 'Height',
                        width: 90,
                        dataIndex: 'heightModel'
                    },
                    {
                        text: 'Box Parent',
                        width: 150,
                        hidden: true,
                        dataIndex: 'boxParent',
                        id: 'boxParentCol'
                    },
                    {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        hideable: false,
                        width: 20,
                        items: [{
                            icon: 'resources/images/delete.gif',
                            iconCls: 'lan-delete-row',
                            tooltip: 'Delete this run',
                            handler: this.onDeleteLayoutRun,
                            scope: this
                        }]
                    }
                ]
            };

        this.layoutTree = Ext.widget(tree);

        this.layoutTree.getSelectionModel().on({
            selectionchange: this.onLayoutSelectionChange,
            scope: this
        });

        return this.layoutTree;
    },

    createPerfPanel: function() {

        var me = this;
        me.build = 1;

        me.perfPanel = Ext.widget({
            xtype: 'panel',
            title: 'Performance Analyzer',
            layout: 'fit',
            border: false,
            tbar: [
                '->',
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Build',
                    style: 'margin-right: 10px;',
                    labelWidth: 30,
                    width: 100,
                    value: me.build,
                    listeners: {
                        change: function (field) {
                            me.build = field.getValue();
                        }
                    }
                },
                {
                    text: 'Gather Stats',
                    handler: me.onGatherStats,
                    scope: me
                }
            ],
            items: [
                new PerfCon.Console({
                    itemId: 'perfcon'
                })
            ]
        });

        return me.perfPanel;
    },

    createLayoutPanel: function() {
        var me = this;
        me.layoutPanel = Ext.widget({
            xtype: 'panel',
            title: 'Layout Analyzer',
            layout: 'border',
            tbar: [
                {
                  text: 'Load Run',
                  iconCls: 'lan-load-run',
                  handler: me.onLoadRun,
                  scope: me
                },
                {
                  text: 'Show All Triggers',
                  enableToggle: true,
                  handler: me.onShowAllTriggers,
                  scope: me
                }
            ],
            items: [
              me.createLayoutTree(),
              me.createDetails()
            ]
        });
        return me.layoutPanel;
    },

    createViewport: function () {
        var me = this,
            ret =  {
            xtype: 'viewport',
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    layout: 'fit',
                    tbar: [
                        {
                            xtype: 'tbtext',
                            text: 'ExtJS Page Analyzer',
                            itemId: 'titleLbl'
                        },
                        '->',
                        {
                            text: 'Reload',
                            itemId: 'reloadBtn',
                            iconCls: 'lan-refresh',
                            handler: me.onReload,
                            scope: me
                        },
                        {
                            text: 'Erase Cookie',
                            itemId: 'eraseCookieBtn',
                            handler: me.onClearCookie,
                            scope: me
                        },
                        {
                            xtype: 'tbtext',
                            itemId: 'stateText'
                        }
                    ],
                    items: [
                        Ext.create('Ext.tab.Panel', {
                            items:[
                                me.createLayoutPanel(),
                                me.createPerfPanel()
                            ]
                        })
                    ]
                }
            ]
        };

        return ret;
    },

    addLayoutChildren: function (parent, children) {
        var n = children.length,
            triggersTpl = Ext.XTemplate.getTpl(this, 'triggerTpl'),
            textTpl = Ext.XTemplate.getTpl(this, 'layoutTpl'),
            child, data, i, j, k, node, triggers;

        for (i = 0; i < n; ++i) {
            child = children[i];
            triggers = [];
            for (j = 0, k = child.triggers.length; j < k; ++j) {
                triggers.push(triggersTpl.apply(child.triggers[j]));
            }

            data = {
                text: textTpl.apply(child),
                iconCls: 'lan-layout' + 
                    (child.allDone ? '' : (child.done ? '-partial' : '-not')) + '-done',
                leaf: !child.children.length,
                triggers: triggers.join(''),
                blocks: child.blocks.join('<br>'),
                boxParent: child.boxParent,
                isBoxParent: child.isBoxParent,
                heightModel: child.heightModel,
                widthModel: child.widthModel,
                type: 'layout'
            };

            if (data.boxParent) {
                this.showBoxParentCol = true;
            }
            if (data.blocks) {
                this.showBlocksCol = true;
            }

            node = new Ext.lan.models.LayoutTreeNode(data);
            parent.appendChild(node);
            this.addLayoutChildren(node, child.children);
        }
    },

    addLayoutRuns: function (run) {
        if (typeof run == 'string') {
            run = Ext.decode(run);
        }
        if (Ext.isArray(run)) {
            Ext.each(run, this.addLayoutRuns, this);
            return;
        }
        if (typeof run.time == 'string') {
            run.time = Ext.Date.parse(run.time, "Y-m-d\\TH:i:s");
        }
        if (typeof run.duration == 'string') {
            run.duration = parseInt(run.duration, 10);
        }

        //run.success = 0;
        run.num = ++this.runNumber;

        var node = new Ext.lan.models.LayoutTreeNode({
            text: Ext.XTemplate.getTpl(this, 'runTpl').apply(run),
            iconCls: 'lan-' + (run.success ? 'good' : 'failed') + '-layout-run',
            type: 'layoutrun'
        });

        this.showBoxParentCol = this.showBlocksCol = false;

        node.rawData = run;
        this.addLayoutChildren(node, run.layouts);

        this.layoutTree.getRootNode().appendChild(node);

        Ext.suspendLayouts();
        if (this.showBoxParentCol) {
            this.layoutTree.down('#boxParentCol').show();
        }
        if (this.showBlocksCol) {
            this.layoutTree.down('#blocksCol').show();
        }
        Ext.resumeLayouts(true);
    },

    onDeleteLayoutRun: function (view, recordIndex, cellIndex, item, e, record) {
        record.parentNode.removeChild(record);
    },

    onLayoutSelectionChange: function(selModel, records) {
        var run, text;

        if (records.length) {
            run = records[0];
            while (run && run.data.type != 'layoutrun') {
                run = run.parentNode;
            }

            text = Ext.JSON.encodeValue(run.rawData, '\n');
            this.rawDataTextArea.setValue(text);
        }
    },

    onLoadRun: function () {
        var me = this;

        var window = new Ext.Window({
            title: 'Load Run',
            width: 400,
            height: 320,
            layout: 'fit',
            modal: true,
            items: [{
                xtype: 'textarea'
            }],
            buttons: [{
                text: 'OK',
                handler: function () {
                    var text = window.down('textarea').getValue();
                    window.destroy();

                    me.addLayoutRuns(text);
                }
            }, {
                text: 'cancel',
                handler: function () {
                    window.destroy();
                }
            }]
        });

        window.show();
    },

    onShowAllTriggers: function (button) {
        var comp = this.layoutTree;

        if (button.pressed) {
            comp.addCls('lan-show-all-triggers');
        } else {
            comp.removeCls('lan-show-all-triggers');
        }

        comp.updateLayout();
    },

    updateLayoutRuns: function () {
        var me = this,
            target = me.target,
            runs = target._layoutRuns;

        if (runs && runs.length) {
            target._layoutRuns = [];
            me.addLayoutRuns(runs);
        }
    },

    onGatherStats: function() {
        var me = this,
            target = me.target,
            perf = target.Ext.Perf,
            con = me.viewport.down('#perfcon');

        // Only gather page startup stats at each reload, not on each gather
        if (!me.statsGatherCount) {
            var a1 = perf.get("Initialize").enter().leave(target.Ext._afterReadytime - target.Ext._beforeReadyTime);
            if (target.Ext._endTime) {
                var a2 = perf.get("Load").enter().leave(target.Ext._endTime - target.Ext._startTime),
                    a3 = perf.get("WaitForReady").enter().leave(target.Ext._readyTime - target.Ext._endTime);

            } else {
                var a4 = perf.get("BeforeReady").enter().leave(target.Ext._readyTime - target.Ext._startTime);
            }
        }

        me.statsGatherCount++;
        var data = perf.getData(),
            accCfg = perf.currentConfig;

        con.addSample({
            env: 'x',
            build: me.build,
            test: target.location.pathname,
            data: data
        });

        if (accCfg) {
            con.setAccumulators(accCfg);
        }
    },

    getHrefMinusHash: function() {
        var href = location.href.replace(Ext.History.getHash(), '');
        return href;
    },

//-------------------------------------------------------------------------
    // Target page mgmt

    states: {
        // the target page has not loaded Ext
        disconnected: {
            text: 'Disconnected',
            style: {
                fontWeight: 'bold',
                color: 'red'
            }
        },

        // the target page is loaded and has Ext.isReady
        loaded: {
            text: 'Loaded',
            style: {
                fontWeight: 'bold',
                color: 'orange'
            }
        },

        // the target page is loading the layout hooks
        hooking: {
            text: 'Loading hooks',
            style: {
                fontWeight: 'bold',
                color: 'yellow'
            }
        },

        ready: { 
            text: 'Ready',
            style: {
                fontWeight: 'bold',
                color: 'green'
            }
        }
    },

    getState: function () {
        var states = this.states,
            target = this.target;

        if (target && target.Ext && target.Ext.isReady) {
            if (target._layoutRuns) {
                return states.ready;
            }
            if (target._hooking) {
                return states.hooking;
            }
            return states.loaded;
        }

        return states.disconnected;
    },

    injectScript: function(script) {
        var me = this,
            url = me.getHrefMinusHash().replace(/\/[^/]+$/, '/' + script),
            target = me.target.document,
            head = target.head || target.getElementsByTagName('head')[0];

        var script = target.createElement('script');

        script.src = url;
        script.type = 'text/javascript';
        head.appendChild(script);
    },

    injectHooks: function () {
        var me=this,
            target = me.target,
            con = me.viewport.down('#perfcon'),
            accCfg = con.getAccumulators();

        target._hooking = true;
        target._accumulatorCfg = accCfg;
        me.injectScript('../../../platform/core/src/perf/Accumulator.js');
        me.injectScript('../../../platform/core/src/perf/Monitor.js');
        me.injectScript('hooks.js');
    },

    onClearCookie: function () {
        var target = this.target,
            date = new Date();

        date.setTime(date.getTime() - 24*60*60*1000);
        date = date.toGMTString();
        target.document.cookie = 'ext-pause=1; expires='+date+'; path='+target.location.href;
    },

    onReload: function () {
        var me = this,
            target = me.target;

        // put a session cookie on the target page so it will pause at onReady so that
        // we can inject our code and resume it to capture the initial layout run:
        target.document.cookie = 'ext-pause=1; path=' + target.location.href;
        target._layoutRuns = null;
        target.location.reload();

        me.reloading = true;
        me.updateConnectedState();
        me.statsGatherCount = 0;
    },

    updateConnectedState: function () {
        var me = this,
            states = me.states,
            state = me.getState();

        if (me.lastState != state) {
            me.lastState = state;
            me.stateText.el.setStyle(state.style);
            me.stateText.setText(state.text);
        }

        if (state == states.loaded) {
            me.injectHooks();
        } else if (state == states.ready) {
            if (me.reloading) {
                me.reloading = false;
                me.onClearCookie();

                me.target.Ext.EventManager.readyEvent.fire();
            }

            me.updateLayoutRuns();
        }
    }
});

(function () {
    function run () {
        Ext.QuickTips.init();

        new Ext.lan.PageAnalyzer({
            target: window.opener
        });
    }

    Ext.onReady(run);
})();
