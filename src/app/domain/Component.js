/**
 * This class implements the component event domain. All classes extending from
 * {@link Ext.Component} are included in this domain. The matching criteria uses
 * {@link Ext.ComponentQuery}.
 * 
 * @protected
 */
Ext.define('Ext.app.domain.Component', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    requires: [
        'Ext.Component'
    ],

    type: 'component',

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.Component);
    },

    match: function(target, selector) {
        return target.is(selector);
    }
});
