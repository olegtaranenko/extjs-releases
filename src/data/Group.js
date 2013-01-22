/** */
Ext.define('Ext.data.Group', {
    
    extend: 'Ext.util.Observable',
    
    key: undefined,
    
    dirty: true,
    
    constructor: function(){
        this.callParent(arguments);
        this.records = [];    
    },
    
    contains: function(record){
        return Ext.Array.indexOf(this.records, record);
    },
    
    add: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }
        this.records = this.records.concat(records);
        this.dirty = true;  
    },
    
    remove: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }
        
        var len = records.length,
            i;
            
        for (i = 0; i < len; ++i) {
            Ext.Array.remove(this.records, records[i]);
        }
        this.dirty = true;
    },
    
    isDirty: function(){
        return this.dirty;    
    },
    
    hasAggregate: function(){
        return !!this.aggregate;
    },
    
    setDirty: function(){
        this.dirty = true;
    },
    
    commit: function(){
        this.dirty = false;
    },
    
    isCollapsed: function(){
        return this.collapsed;    
    },
    
    getAggregateRecord: function(forceNew){
        var me = this,
            Model;
            
        if (forceNew === true || me.dirty || !me.aggregate) {
            Model = me.store.model;
            me.aggregate = new Model();
            me.aggregate.isSummary = true;
        }
        return me.aggregate;
    }
    
});
