/**
 * This class implements the controller event domain. All classes extending from
 * {@link Ext.app.Controller} are included in this domain. The selectors are simply id's or the
 * wildcard "*" to match any controller.
 * 
 * @protected
 */
Ext.define('Ext.app.domain.Controller', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    requires: [
        'Ext.app.Controller'
    ],

    type: 'controller',

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.app.Controller);
    },

    match: function(target, selector) {
        return selector === '*' || target.id === selector;
    }
});
