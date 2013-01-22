Ext.define('SenchaCon.Util', {
    singleton : true,
    avatarRoot : 'http://src.sencha.io/72/' ,

    config: {
        imgPath: 'js/Sencha/resources/img/',

        domain: window.location.origin
    },

    // Documentation here
    calcUtcTime : function(field) {
        var me = this;

        return function(value, record) {
            var day = record.get('session_day'),
                utc = day + record.get(field) + me.tzOffset*60;
            return Ext.Date.parseDate(utc, 'U');
        }
    },
    getNormalizedDate : function(intDate) {

        return Ext.Date.parse(intDate + this.tzOffset, 'U');
    },
    getFormattedDate : function(intDate, value) {

    },
    getTwitter: function(twitter) {
        if (twitter.length) {
            return '@' + twitter;
        }
        return '';
    },
    getAvatar : function(avatar) {
        if (avatar.length) {
            return this.avatarRoot + avatar;
        }

        return 'img/speaker_silhouette.png';
    },
    formatSessionStart : function(session, dateFormat) {
        var sessStart = parseInt(session.session_start, 10),
            sessDay   = parseInt(session.session_day, 10),
            normDate  = this.getNormalizedDate(sessStart + sessDay);

        return  Ext.Date.format(normDate, dateFormat)

    },
    formatSessionEnd : function(session, dateFormat) {
        var sessEnd  = parseInt(session.session_end, 10),
            sessDay  = parseInt(session.session_day, 10),
            normDate = this.getNormalizedDate(sessEnd + sessDay);

        return  Ext.Date.format(normDate, dateFormat)
    }
}, function() {
    // set time zone offset
    var me = this;
    if (!Ext.isDefined(me.tzOffset)) {
        me.tzOffset = new Date().getTimezoneOffset() * 60
    }

});