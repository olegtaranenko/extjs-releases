Ext.define('Neptune.view.grid.Grids', {
    extend: 'Ext.container.Container',
    xtype: 'grids',
    id: 'grids',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 500,
        height: 300
    },
    items: [
        { xtype: 'basicGrid', title: 'Grid with Cell Editing'},
        {
            xtype: 'basicGrid',
            plugins: {
                ptype: 'rowediting'
            },
            rowLines: false,
            title: 'Grid with Row Editing, and no Row Lines' 
        },
        {
            xtype: 'basicGrid',
            selType: 'checkboxmodel',
            plugins: null,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Company',
                dock: 'bottom',
                displayInfo: true
            }],
            title: 'Grid with Checkbox Selection Model and Paging Toolbar'
        },
        {
            xtype: 'groupHeaderGrid'
            
        }
    ]
});