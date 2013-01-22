Ext.define('KitchenSink.view.examples.grids.BasicGrid', {
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
            ]
        }
        
        
    ]
});
