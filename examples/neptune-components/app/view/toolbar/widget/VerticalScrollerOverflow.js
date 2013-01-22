Ext.define('Neptune.view.toolbar.widget.VerticalScrollerOverflow', {
    extend: 'Neptune.view.toolbar.widget.MenuOverflow',
    xtype: 'verticalScrollerOverflowToolbar',
    layout: {
        type: 'vbox',
        overflowHandler: 'Scroller'
    }
});