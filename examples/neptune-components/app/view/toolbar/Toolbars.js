Ext.define('Neptune.view.toolbar.Toolbars', {
    extend: 'Ext.container.Container',
    xtype: 'toolbars',
    id: 'toolbars',

    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 600
    },
    items: [
        { xtype: 'basicToolbar' },
        { xtype: 'verticalFieldsToolbar', width: null, rowspan: 5 },
        { xtype: 'verticalToolbar', width: null, rowspan: 10 },
        { xtype: 'mediumToolbar' },
        { xtype: 'largeToolbar' },
        { xtype: 'mixedToolbar' },
        { xtype: 'fieldsToolbar' },
        { xtype: 'fieldsToolbar2' },
        { xtype: 'verticalMenuOverflowToolbar', height: 100, width: null, rowspan: 3 },
        { xtype: 'menuOverflowToolbar' },
        { xtype: 'scrollerOverflowToolbar' },
        { xtype: 'simpleButtonGroupToolbar' },
        { xtype: 'verticalScrollerOverflowToolbar', height: 100, width: null, rowspan: 2 },
        { xtype: 'complexButtonGroupToolbar' }
    ]
});