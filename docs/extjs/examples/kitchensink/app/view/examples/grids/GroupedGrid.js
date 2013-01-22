Ext.define('KitchenSink.view.examples.grids.GroupedGrid', {
    extend: 'KitchenSink.view.examples.Example',
    items: [
        
        
        {
            xtype: 'grid',
            
            title: 'Restaurants',
            frame: true,
            
            store: Ext.create('KitchenSink.store.Restaurants'),
            
            columns: [
                { text: 'Name', flex: 1, dataIndex: 'name' },
                { text: 'Cuisine', flex: 1, dataIndex: 'cuisine' }
            ],
            
            features: [
                Ext.create('Ext.grid.feature.Grouping',{
                    groupHeaderTpl: 'Cuisine: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                })
            ]
        }
        
        
    ]
});
