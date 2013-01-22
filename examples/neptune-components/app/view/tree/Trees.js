Ext.define('Neptune.view.tree.Trees', {
    extend: 'Ext.container.Container',
    xtype: 'trees',
    id: 'trees',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 300,
        height: 300
    },
    items: [
        { xtype: 'basicTree' },
        { xtype: 'basicTree', lines: false, title: 'Tree with no lines' },
        { xtype: 'treeGrid', width: 615, colspan: 2 },
    ]
});