Ext.define('Ext.rtl.view.Table', {
    override: 'Ext.view.Table',

    rtlCellTpl: [
        '<td class="' + Ext.baseCSSPrefix + 'rtl {tdCls}" {tdAttr}>',
            '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'rtl ' + Ext.baseCSSPrefix + 'grid-cell-inner"',
                'style="text-align:{%this.getAlign(values)%};<tpl if="style">{style}</tpl>">{value}</div>',
        '</td>',
        {
            priority: 0,
            rtlAlign: {
                right: 'left',
                left: 'right',
                center: 'center'
            },
            getAlign: function(align) {
                return this.rtlAlign[align];
            }
        }
    ],

    beforeRender: function() {
        var me = this;

        me.callParent();
        if (me.getHierarchyState().rtl) {
            me.addCellTpl(me.getTpl('rtlCellTpl'));
        }
    }
});