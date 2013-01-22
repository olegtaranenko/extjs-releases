Ext.define('SenchaCon.model.Session', {
    extend: 'Ext.data.Model',

    requires : [ 'SenchaCon.Util' ],
    reader : {
        type : 'json'
    },
    fields : [
        'favorite',
        'title', 
		'url_title',
        'session_track',
		'speakers',// set in the controller and used for the views
		'session_speakers',
        'session_room',
        'session_description',
        {name : 'orig_session_start', mapping : 'session_start'},
        {name : 'id', mapping : 'entry_id'},
        {
            name    : 'raw_session_start',
            mapping : 'session_start',
            type    : 'int'
        },
        {
            name    : 'raw_session_end',
            mapping : 'session_end',
            type    : 'int'
        },
        {
            name    : 'raw_session_day',
            mapping : 'session_day',
            type    : 'int'
        },
        {
            name: 'session_day'
        },
        {
            name    : 'session_start',
            type    : 'date',
            convert : function(value, record) {
                var recordData = record.data;
                return SenchaCon.Util.getNormalizedDate(recordData.raw_session_day + recordData.raw_session_start)
            }
        },
        {
            name    : 'session_end',
            type    : 'date',
            convert : function(value, record) {
                var recordData = record.data;
                return SenchaCon.Util.getNormalizedDate(recordData.raw_session_day + recordData.raw_session_end);
            }
        }
    ]
});