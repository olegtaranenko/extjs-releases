Ext.define('Neptune.view.panel.widget.NestedFramed', {
    extend: 'Ext.panel.Panel',
    xtype: 'nestedFramedPanel',

    title: 'Nested Framed Panels',
    width: 200,
    frame: true,
    padding: 10,
    closable: true,
    items: [{
        title: 'Inner Panel',
        height: 152,
        frame: true,
        html: NeptuneAppData.dummyText
    }]
});