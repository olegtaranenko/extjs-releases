Ext.define('SenchaCon.store.Sessions', {
    extend   : 'Ext.data.Store',

    model    : 'SenchaCon.model.Session',
    sorters  : [
        {
            property: 'session_start',
            direction: 'ASC'
        },
        {
            property: 'session_track',
            direction: 'ASC'
        }
    ],
    groupField: 'session_start',
    proxy    : {
        type : 'jsonp',
        url  : 'http://www.sencha.com/json',
        callbackKey : 'callback'
    },
    getGroupString : function(record) {
        return Ext.Date.format(record.get('session_start'), 'YmdHi');
    }
});