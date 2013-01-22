Ext.define('Ext.rtl.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    
    setButtonPosition: function(btnEl, left){
        if (this.getHierarchyState().rtl) {
            btnEl.rtlSetLocalX(left);
        } else {
            this.callParent(arguments);
        }
    }
});
