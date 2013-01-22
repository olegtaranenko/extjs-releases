Ext.define('Ext.rtl.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    calculateThumbPosition : function(v) {
        var me = this,
            pos = me.callParent(arguments);
            
        if (!me.vertical && me.getHierarchyState().rtl) {
            pos = 100 - pos;
        }
        return pos;
    },
    
    reversePixelValue : function(pos) {
        var me = this;
        pos = me.callParent(arguments);
        if (!me.vertical && me.getHierarchyState().rtl) {
            pos = me.maxValue - pos + me.minValue;
        }
        return pos;
    },
    
    reversePercentageValue: function(pos){
        var me = this,
            value = me.callParent(arguments);
            
        if (!me.vertical && me.getHierarchyState().rtl) {
            value = me.maxValue - value + me.minValue;
        }
        return value;
    }
});