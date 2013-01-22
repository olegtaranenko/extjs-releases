/**
 * This class implements the data store event domain. All classes extending from 
 * {@link Ext.data.AbstractStore} are included in this domain. The selectors are simply
 * store id's or the wildcard "*" to match any store.
 *
 * @protected
 */

Ext.define('Ext.app.domain.Store', {
    extend: 'Ext.app.EventDomain',
    singleton: true,
    
    requires: [
        'Ext.data.AbstractStore'
    ],
    
    type: 'store',
    
    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.data.AbstractStore);
    },
    
    match: function(target, selector) {
        return selector === '*' || target.storeId === selector;
    }
});
