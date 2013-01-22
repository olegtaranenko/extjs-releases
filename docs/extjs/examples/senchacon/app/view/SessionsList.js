Ext.define('SenchaCon.view.SessionsList', {
	extend: 'Ext.grid.Panel',
	xtype: 'sessionslist',

	columns: [
        {
            header: 'Title',
            dataIndex: 'title',
            sortable: false,
            flex: 5
        },
        {
        	header: 'Start Time',
        	dataIndex: 'session_start',
        	xtype: 'datecolumn',
        	format: 'g:iA',
        	flex: 1
        }
    ],

    store: 'Sessions',

    afterLayout: function() {
    	this.callParent(arguments);

    	if (this.store.getCount() == 0) {
	        this.store.load({
	            params: {
	                name     : 'sessions',
	                channel  : 'conference_sessions',
	                orderby  : 'session_day',
	                sort     : 'asc',
	                limit    : 100,
	                fields   : '|session_type|session_description|session_speakers|session_track|session_day|session_start|session_end|session_room'
	            }
	        });
    	}

        this.store.clearFilter();
        if (this.filter) {
	        this.store.filter('session_day', this.filter);
	    }
    }
});
