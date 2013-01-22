Ext.define('KitchenSink.view.List', {
    extend: 'Ext.tree.Panel',
    xtype: 'exampleList',
    
    title: 'Examples',
    rootVisible: false,
	
	cls: 'examples-list',
    
    lines: false,
    useArrows: true,
    
    store: 'Examples'
});
