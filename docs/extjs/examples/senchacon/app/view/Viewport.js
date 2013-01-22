Ext.define('SenchaCon.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'SenchaCon.view.Header',
        'SenchaCon.view.SessionsList',
        'SenchaCon.view.InformationPanel'
    ],

	layout: 'border',

    items: [
    	{
    		region: 'north',
            xtype : 'header'
    	},

    	{
    		region: 'center',
            xtype : 'tabpanel',

            items: [
                {
                    title : 'Mon 10/24',
                    xtype : 'sessionslist',
                    filter: '1319414400'
                },
                {
                    title : 'Tues 10/25',
                    xtype : 'sessionslist',
                    filter: '1319500800'
                },
                {
                    title : 'Wed 10/26',
                    xtype : 'sessionslist',
                    filter: '1319587200'
                }
            ]
    	},

        {
            region: 'east',
            xtype : 'informationpanel'
        }
    ]
});