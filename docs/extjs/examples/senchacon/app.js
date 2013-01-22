Ext.application({
    name: 'SenchaCon',

    controllers: [
        'Sessions'
    ],

    launch: function() {
    	Ext.require('SenchaCon.Util');
        Ext.create('SenchaCon.view.Viewport');
    }
});
