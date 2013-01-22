/**
 * This feature is used to place a summary row at the bottom of the grid. If using a grouping, 
 * see {@link Ext.grid.feature.GroupingSummary}. There are 2 aspects to calculating the summaries, 
 * calculation and rendering.
 * 
 * ## Calculation
 * The summary value needs to be calculated for each column in the grid. This is controlled
 * by the summaryType option specified on the column. There are several built in summary types,
 * which can be specified as a string on the column configuration. These call underlying methods
 * on the store:
 *
 *  - {@link Ext.data.Store#count count}
 *  - {@link Ext.data.Store#sum sum}
 *  - {@link Ext.data.Store#min min}
 *  - {@link Ext.data.Store#max max}
 *  - {@link Ext.data.Store#average average}
 *
 * Alternatively, the summaryType can be a function definition. If this is the case,
 * the function is called with an array of records to calculate the summary value.
 * 
 * ## Rendering
 * Similar to a column, the summary also supports a summaryRenderer function. This
 * summaryRenderer is called before displaying a value. The function is optional, if
 * not specified the default calculated value is shown. The summaryRenderer is called with:
 *
 *  - value {Object} - The calculated value.
 *  - summaryData {Object} - Contains all raw summary values for the row.
 *  - field {String} - The name of the field we are calculating
 * 
 * ## Example Usage
 *
 *     @example
 *     Ext.define('TestResult', {
 *         extend: 'Ext.data.Model',
 *         fields: ['student', {
 *             name: 'mark',
 *             type: 'int'
 *         }]
 *     });
 *     
 *     Ext.create('Ext.grid.Panel', {
 *         width: 400,
 *         height: 200,
 *         title: 'Summary Test',
 *         style: 'padding: 20px',
 *         renderTo: document.body,
 *         features: [{
 *             ftype: 'summary'
 *         }],
 *         store: {
 *             model: 'TestResult',
 *             data: [{
 *                 student: 'Student 1',
 *                 mark: 84
 *             },{
 *                 student: 'Student 2',
 *                 mark: 72
 *             },{
 *                 student: 'Student 3',
 *                 mark: 96
 *             },{
 *                 student: 'Student 4',
 *                 mark: 68
 *             }]
 *         },
 *         columns: [{
 *             dataIndex: 'student',
 *             text: 'Name',
 *             summaryType: 'count',
 *             summaryRenderer: function(value, summaryData, dataIndex) {
 *                 return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : ''); 
 *             }
 *         }, {
 *             dataIndex: 'mark',
 *             text: 'Mark',
 *             summaryType: 'average'
 *         }]
 *     });
 */
Ext.define('Ext.grid.feature.Summary', {

    /* Begin Definitions */

    extend: 'Ext.grid.feature.AbstractSummary',

    alias: 'feature.summary',

    /**
     * @cfg {String} dock
     * Configure `'top'` or `'bottom'` top create a fixed summary row either above or below the scrollable table.
     *
     */
    dock: undefined,

    dockedSummaryCls: Ext.baseCSSPrefix + 'docked-summary',

    panelBodyCls: Ext.baseCSSPrefix + 'summary-',

    init: function(grid) {
        var me = this,
            view = me.view,
            tableTpl = view.tableTpl;

        me.callParent(arguments);

        if (me.dock) {
            grid.headerCt.on({
                afterlayout: me.onStoreUpdate,
                scope: me
            });
            me.grid.on({
                beforerender: function() {
                    me.summaryBar = me.grid.addDocked({
                        childEls: ['innerCt'],
                        renderTpl: '<div id="{id}-innerCt"><table class="' + Ext.baseCSSPrefix + 'grid-table"><tr class="' + me.summaryRowCls + '"></tr></table></div>',
                        style: 'overflow:hidden',
                        itemId: 'summaryBar',
                        cls: [ me.dockedSummaryCls, me.dockedSummaryCls + '-' + me.dock ],
                        xtype: 'component',
                        dock: me.dock,
                        weight: 10000000
                    })[0];
                },
                afterrender: function() {
                    me.grid.body.addCls(me.panelBodyCls + me.dock);
                    me.view.mon(me.view.el, {
                        scroll: me.onViewScroll,
                        scope: me
                    });
                    me.onStoreUpdate();
                },
                single: true
            });

            // Stretch the innerCt of the summary bar upon headerCt layout
            me.grid.headerCt.afterComponentLayout = Ext.Function.createSequence(me.grid.headerCt.afterComponentLayout, function() {
                me.summaryBar.innerCt.setWidth(this.getFullWidth() + Ext.getScrollbarSize().width);
            });
        } else {
            // Undocked summary is in the TFoot.
            // Override the renderTFoot implementation in the last tableTpl
            while (tableTpl.nextTpl) {
                tableTpl = tableTpl.nextTpl;
            }
            tableTpl.renderTFoot = me.renderTFoot;
        }

        me.grid.on({
            columnmove: me.onStoreUpdate,
            scope: me
        });

        // On change of data, we have to update the docked summary.
        me.view.mon(me.view.store, {
            update: me.onStoreUpdate,
            datachanged: me.onStoreUpdate,
            scope: me
        });
    },

    renderTFoot: function(values, out) {
        var view = values.view,
            me = view.findFeature('summary');

        out.push('<tfoot>');
        me.outputSummaryRecord(me.createSummaryRecord(view), values, out);
        out.push('</tfoot>');
    },
    
    vetoEvent: function(record, row, rowIndex, e) {
        return !e.getTarget(this.summaryRowSelector);
    },

    onViewScroll: function() {
        this.summaryBar.el.dom.scrollLeft = this.view.el.dom.scrollLeft;
    },

    createSummaryRecord: function(view) {
        var columns = view.headerCt.getVisibleGridColumns(),
            info = {
                records: view.store.getRange()
            },
            colCount = columns.length, i, column,
            summaryRecord = this.summaryRecord || (this.summaryRecord = new view.store.model(null, view.id + '-summary-record'));

        // Set the summary field values
        summaryRecord.beginEdit();
        for (i = 0; i < colCount; i++) {
            column = columns[i];

            // In summary records, if there's no dataIndex, then the value in regular rows must come from a renderer.
            // We set the data value in using the column ID.
            if (!column.dataIndex) {
                column.dataIndex = column.id;
            }

            summaryRecord.set(column.dataIndex, this.getSummary(view.store, column.summaryType, column.dataIndex, info));
        }
        summaryRecord.endEdit(true);
        // It's not dirty
        summaryRecord.commit(true);
        summaryRecord.isSummary = true;

        return summaryRecord;
    },

    onStoreUpdate: function() {
        var me = this,
            record = this.createSummaryRecord(this.view),
            newRowDom = me.view.createRowElement(record, -1),
            oldRowDom,
            p;

        // Summary row is inside the docked summaryBar Component
        if (me.dock) {
            oldRowDom = me.summaryBar.el.down('.' + me.summaryRowCls, true);
        }
        // Summary row is a regular row in a THEAD inside the View.
        // Downlinked through the summary record's ID'
        else {
            oldRowDom = me.view.getNode(record);
        }
        p = oldRowDom.parentNode;
        p.insertBefore(newRowDom, oldRowDom);
        p.removeChild(oldRowDom);

        // For locking grids...
        // Update summary on other side (unless we have been called from the other side)
        if (me.lockingPartner && me.lockingPartner.grid.rendered && !me.calledFromLockingPartner) {
            me.lockingPartner.calledFromLockingPartner = true;
            me.lockingPartner.onStoreUpdate();
            me.lockingPartner.calledFromLockingPartner = false;
        }
        // If docked, the updated row will need sizing because it's outside the View
        if (me.dock) {
            me.onColumnHeaderLayout();
        }
    },

    // Synchronize column widths in the docked summary Component
    onColumnHeaderLayout: function() {
        var view = this.view,
            columns = view.headerCt.getGridColumns(),
            column,
            len = columns.length, i,
            summaryEl = this.summaryBar.el,
            el;

        for (i = 0; i < len; i++) {
            column = columns[i];
            el = summaryEl.down(view.getCellSelector(column));
            if (el) {
                if (column.hidden) {
                    el.setDisplayed(false);
                } else {
                    el.setDisplayed(true);
                    el.setWidth(column.width || (column.lastBox ? column.lastBox.width : 100));
                }
            }
        }
    }
});