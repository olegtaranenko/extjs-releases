/**
 * Provides a registry of available Plugin classes indexed by a mnemonic code known as the Plugin's ptype.
 *
 * A plugin may be specified simply as a *config object* as long as the correct `ptype` is specified:
 *
 *     {
 *         ptype: 'gridviewdragdrop',
 *         dragText: 'Drag and drop to reorganize'
 *     }
 *
 * Or just use the ptype on its own:
 *
 *     'gridviewdragdrop'
 *
 * Alternatively you can instantiate the plugin with Ext.create:
 *
 *     Ext.create('Ext.grid.plugin.DragDrop', {
 *         dragText: 'Drag and drop to reorganize'
 *     })
 */
Ext.define('Ext.PluginManager', {
    extend: 'Ext.AbstractManager',
    alternateClassName: 'Ext.PluginMgr',
    singleton: true,
    typeName: 'ptype',

    /**
     * Creates a new Plugin from the specified config object using the config object's ptype to determine the class to
     * instantiate.
     * @param {Object} config A configuration object for the Plugin you wish to create.
     * @param {Function} defaultType (optional) The constructor to provide the default Plugin type if the config object does not
     * contain a `ptype`. (Optional if the config contains a `ptype`).
     * @return {Ext.Component} The newly instantiated Plugin.
     */
    create : function(config, defaultType){
        if (config.init) {
            return config;
        } else {
            // Lookup the class from the ptype and instantiate unless its a singleton
            var result = Ext.ClassManager.getByAlias('plugin.' + (config.ptype || defaultType));
            if (typeof result === 'function') {
                result = new result(config);
            }
            return result;
        }
    },

    /**
     * Returns all plugins registered with the given type. Here, 'type' refers to the type of plugin, not its ptype.
     * @param {String} type The type to search for
     * @param {Boolean} defaultsOnly True to only return plugins of this type where the plugin's isDefault property is
     * truthy
     * @return {Ext.AbstractPlugin[]} All matching plugins
     */
    findByType: function(type, defaultsOnly) {
        var matches = [],
            types   = this.types,
            name,
            item;

        for (name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            item = types[name];

            if (item.type == type && (!defaultsOnly || (defaultsOnly === true && item.isDefault))) {
                matches.push(item);
            }
        }

        return matches;
    }
}, function() {
    /**
     * Shorthand for {@link Ext.PluginManager#registerType}
     * @param {String} ptype The ptype mnemonic string by which the Plugin class
     * may be looked up.
     * @param {Function} cls The new Plugin class.
     * @member Ext
     * @method preg
     */
    Ext.preg = function() {
        return Ext.PluginManager.registerType.apply(Ext.PluginManager, arguments);
    };
});
