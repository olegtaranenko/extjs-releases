Ext.define('Ext.rtl.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    isOnLeftEdge: function(e) {
        return (!this.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            (this.getX() + this.getWidth() - e.getXY()[0] <= this.handleWidth) :
            this.callParent(arguments);
    },

    isOnRightEdge: function(e) {
        return (!this.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            (e.getXY()[0] - this.getX() <= this.handleWidth) : this.callParent(arguments);
    }

});