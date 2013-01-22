Ext.define('SenchaCon.view.InformationPanel', {
	extend: 'Ext.Panel',
	xtype: 'informationpanel',

    ui: 'information',

    bodyPadding: 10,
    width : 350,
    hidden: true,

    tpl: Ext.create('Ext.XTemplate', 
        '<h1>{title}</h1>',
        '<h2>{[this.time(values.session_day, values.session_start, values.session_end)]}</h2>',
        '<p>{session_description}</p>',
        {
            time: function(session_day, session_start, session_end) {
                var time = "",
                    day = Ext.Date.format(Ext.Date.parse(session_day, 'U'), 'j');
                
                day = parseInt(day, 10);
                day += 1;

                time += "10/" + day;
                time += " ";
                time += Ext.Date.format(session_start, 'g:iA');
                time += "-";
                time += Ext.Date.format(session_end, 'g:iA');

                return time;
            }
        }
    ),

    bind: function(record) {
        this.show();

        this.tpl.overwrite(this.body, record.data);
    }
});
