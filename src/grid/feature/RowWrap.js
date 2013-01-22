/**
 * @private
 */
Ext.define('Ext.grid.feature.RowWrap', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.rowwrap',
    
    rowWrapTd: 'td.' + Ext.baseCSSPrefix + 'grid-rowwrap',
    
    // turn off feature events.
    hasFeatureEvent: false,
    
    tableTpl: {
        before: function(values, out) {
            if (values.view.bufferedRenderer) {
                values.view.bufferedRenderer.variableRowHeight = true;
            }
        },
        priority: 200
    },

    wrapTpl: [
        '<tr data-boundView="{view.id}" data-recordId="{record.internalId}" data-recordIndex="{recordIndex}" class="{[values.itemClasses.join(" ")]} ' + Ext.baseCSSPrefix + 'grid-wrap-row">',
            '<td class="' + Ext.baseCSSPrefix + 'grid-rowwrap" colSpan="{columns.length}">',
                '<table class="' + Ext.baseCSSPrefix + '{view.id}-table ' + Ext.baseCSSPrefix + 'grid-table" border="0" cellspacing="0" cellpadding="0">',
                    '{[values.view.renderColumnSizer(out)]}',
                    '{%',
                        'values.itemClasses.length = 0;',
                        'this.nextTpl.applyOut(values, out, parent)',
                    '%}',
                '</table>',
            '</td>',
        '</tr>', {
            priority: 200
        }
    ],

    init: function(grid) {
        var me = this;
        me.view.addTableTpl(me.tableTpl);
        me.view.addRowTpl(Ext.XTemplate.getTpl(me, 'wrapTpl'));
        me.view.headerCt.on({
            columnhide: me.onColumnHideShow,
            columnshow: me.onColumnHideShow,
            scope: me
        });
    },

    // Keep row wtap colspan in sync with number of *visible* columns.
    onColumnHideShow: function() {
        var view = this.view,
            items = view.el.query(this.rowWrapTd),
            colspan = view.headerCt.getGridColumns(true).length,
            len = items.length,
            i;
            
        for (i = 0; i < len; ++i) {
            items[i].colSpan = colspan;
        }
    }
});