Ext.define('SenchaCon.controller.Sessions', {
    extend: 'Ext.app.Controller',
    
    stores: ['Sessions'],

    views: [
        'Viewport'
    ],

    refs: [
        {
            ref: 'sessionsList',
            selector: 'sessionslist'
        },
        {
            ref: 'informationPanel',
            selector: 'informationpanel'
        }
    ],

    init: function() {
        this.control({
            'sessionslist': {
                'select': this.onItemSelect
            }
        });
    },

    onItemSelect: function(selection, record, index) {
        this.getInformationPanel().bind(record);
    }
});
