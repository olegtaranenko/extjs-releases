Ext.data.JsonP.Ext_ComponentQuery({"mixedInto":[],"tagname":"class","meta":{},"allMixins":[],"files":[{"href":"ComponentQuery.html#Ext-ComponentQuery","filename":"ComponentQuery.js"}],"aliases":{},"uses":["Ext.ComponentManager"],"members":{"event":[],"property":[{"meta":{"protected":true},"tagname":"property","owner":"Ext.Base","name":"self","id":"property-self"}],"method":[{"meta":{"protected":true,"deprecated":{"text":"as of 4.1. Use {@link #callParent} instead."}},"tagname":"method","owner":"Ext.Base","name":"callOverridden","id":"method-callOverridden"},{"meta":{"protected":true},"tagname":"method","owner":"Ext.Base","name":"callParent","id":"method-callParent"},{"meta":{},"tagname":"method","owner":"Ext.Base","name":"getInitialConfig","id":"method-getInitialConfig"},{"meta":{"protected":true},"tagname":"method","owner":"Ext.Base","name":"initConfig","id":"method-initConfig"},{"meta":{},"tagname":"method","owner":"Ext.ComponentQuery","name":"is","id":"method-is"},{"meta":{},"tagname":"method","owner":"Ext.ComponentQuery","name":"query","id":"method-query"},{"meta":{"protected":true},"tagname":"method","owner":"Ext.Base","name":"statics","id":"method-statics"}],"css_var":[],"css_mixin":[],"cfg":[]},"inheritable":false,"extends":"Ext.Base","statics":{"property":[],"event":[],"method":[],"css_var":[],"css_mixin":[],"cfg":[]},"alternateClassNames":[],"private":false,"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.Base' rel='Ext.Base' class='docClass'>Ext.Base</a><div class='subclass '><strong>Ext.ComponentQuery</strong></div></div><h4>Uses</h4><div class='dependency'><a href='#!/api/Ext.ComponentManager' rel='Ext.ComponentManager' class='docClass'>Ext.ComponentManager</a></div><h4>Files</h4><div class='dependency'><a href='source/ComponentQuery.html#Ext-ComponentQuery' target='_blank'>ComponentQuery.js</a></div></pre><div class='doc-contents'><p>Provides searching of Components within <a href=\"#!/api/Ext.ComponentManager\" rel=\"Ext.ComponentManager\" class=\"docClass\">Ext.ComponentManager</a> (globally) or a specific\n<a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a> on the document with a similar syntax to a CSS selector.</p>\n\n<p>Components can be retrieved by using their <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">xtype</a> with an optional . prefix</p>\n\n<ul>\n<li><code>component</code> or <code>.component</code></li>\n<li><code>gridpanel</code> or <code>.gridpanel</code></li>\n</ul>\n\n\n<p>An itemId or id must be prefixed with a #</p>\n\n<ul>\n<li><code>#myContainer</code></li>\n</ul>\n\n\n<p>Attributes must be wrapped in brackets</p>\n\n<ul>\n<li><code>component[autoScroll]</code></li>\n<li><code>panel[title=\"Test\"]</code></li>\n</ul>\n\n\n<p>Member expressions from candidate Components may be tested. If the expression returns a <em>truthy</em> value,\nthe candidate Component will be included in the query:</p>\n\n<pre><code>var disabledFields = myFormPanel.query(\"{isDisabled()}\");\n</code></pre>\n\n<p>Pseudo classes may be used to filter results in the same way as in <a href=\"#!/api/Ext.dom.Query\" rel=\"Ext.dom.Query\" class=\"docClass\">DomQuery</a>:</p>\n\n<pre><code>// Function receives array and returns a filtered array.\nExt.ComponentQuery.pseudos.invalid = function(items) {\n    var i = 0, l = items.length, c, result = [];\n    for (; i &lt; l; i++) {\n        if (!(c = items[i]).isValid()) {\n            result.push(c);\n        }\n    }\n    return result;\n};\n\nvar invalidFields = myFormPanel.query('field:invalid');\nif (invalidFields.length) {\n    invalidFields[0].getEl().scrollIntoView(myFormPanel.body);\n    for (var i = 0, l = invalidFields.length; i &lt; l; i++) {\n        invalidFields[i].getEl().frame(\"red\");\n    }\n}\n</code></pre>\n\n<p>Default pseudos include:</p>\n\n<ul>\n<li>not</li>\n<li>last</li>\n</ul>\n\n\n<p>Queries return an array of components.\nHere are some example queries.</p>\n\n<pre><code>// retrieve all Ext.Panels in the document by xtype\nvar panelsArray = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('panel');\n\n// retrieve all Ext.Panels within the container with an id myCt\nvar panelsWithinmyCt = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('#myCt panel');\n\n// retrieve all direct children which are Ext.Panels within myCt\nvar directChildPanel = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('#myCt &gt; panel');\n\n// retrieve all grids and trees\nvar gridsAndTrees = <a href=\"#!/api/Ext.ComponentQuery-method-query\" rel=\"Ext.ComponentQuery-method-query\" class=\"docClass\">Ext.ComponentQuery.query</a>('gridpanel, treepanel');\n</code></pre>\n\n<p>For easy access to queries based from a particular Container see the <a href=\"#!/api/Ext.container.Container-method-query\" rel=\"Ext.container.Container-method-query\" class=\"docClass\">Ext.container.Container.query</a>,\n<a href=\"#!/api/Ext.container.Container-method-down\" rel=\"Ext.container.Container-method-down\" class=\"docClass\">Ext.container.Container.down</a> and <a href=\"#!/api/Ext.container.Container-method-child\" rel=\"Ext.container.Container-method-child\" class=\"docClass\">Ext.container.Container.child</a> methods. Also see\n<a href=\"#!/api/Ext.Component-method-up\" rel=\"Ext.Component-method-up\" class=\"docClass\">Ext.Component.up</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-self' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-property-self' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-property-self' class='name expandable'>self</a><span> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the current class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the current class from which this object was instantiated. Unlike <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>,\n<code>this.self</code> is scope-dependent and it's meant to be used for dynamic inheritance. See <a href=\"#!/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">statics</a>\nfor a detailed comparison</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Cat', {\n    statics: {\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        alert(this.self.speciesName); / dependentOL on 'this'\n    },\n\n    clone: function() {\n        return new this.self();\n    }\n});\n\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.SnowLeopard', {\n    extend: 'My.Cat',\n    statics: {\n        speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'\n    }\n});\n\nvar cat = new My.Cat();                     // alerts 'Cat'\nvar snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(<a href=\"#!/api/Ext-method-getClassName\" rel=\"Ext-method-getClassName\" class=\"docClass\">Ext.getClassName</a>(clone));             // alerts 'My.SnowLeopard'\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-callOverridden' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-method-callOverridden' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callOverridden' class='name expandable'>callOverridden</a>( <span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a>/Arguments args</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><strong class='deprecated signature'>deprecated</strong><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the original method that was previously overridden with override\n\nExt.define('My.Cat', {\n    constructor: functi...</div><div class='long'><p>Call the original method that was previously overridden with <a href=\"#!/api/Ext.Base-static-method-override\" rel=\"Ext.Base-static-method-override\" class=\"docClass\">override</a></p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n        <div class='signature-box deprecated'>\n        <p>This member has been <strong>deprecated</strong> </p>\n        <p>as of 4.1. Use <a href=\"#!/api/Ext.ComponentQuery-method-callParent\" rel=\"Ext.ComponentQuery-method-callParent\" class=\"docClass\">callParent</a> instead.</p>\n\n        </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a>/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object\nfrom the current method, for example: <code>this.callOverridden(arguments)</code></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>Returns the result of calling the overridden method</p>\n</div></li></ul></div></div></div><div id='method-callParent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-method-callParent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-callParent' class='name expandable'>callParent</a>( <span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a>/Arguments args</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Call the \"parent\" method of the current method. ...</div><div class='long'><p>Call the \"parent\" method of the current method. That is the method previously\noverridden by derivation or by an override (see <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>).</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Base', {\n     constructor: function (x) {\n         this.x = x;\n     },\n\n     statics: {\n         method: function (x) {\n             return x;\n         }\n     }\n });\n\n <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Derived', {\n     extend: 'My.Base',\n\n     constructor: function () {\n         this.callParent([21]);\n     }\n });\n\n var obj = new My.Derived();\n\n alert(obj.x);  // alerts 21\n</code></pre>\n\n<p>This can be used with an override as follows:</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.DerivedOverride', {\n     override: 'My.Derived',\n\n     constructor: function (x) {\n         this.callParent([x*2]); // calls original My.Derived constructor\n     }\n });\n\n var obj = new My.Derived();\n\n alert(obj.x);  // now alerts 42\n</code></pre>\n\n<p>This also works with static methods.</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Derived2', {\n     extend: 'My.Base',\n\n     statics: {\n         method: function (x) {\n             return this.callParent([x*2]); // calls My.Base.method\n         }\n     }\n });\n\n alert(My.Base.method(10);     // alerts 10\n alert(My.Derived2.method(10); // alerts 20\n</code></pre>\n\n<p>Lastly, it also works with overridden static methods.</p>\n\n<pre><code> <a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Derived2Override', {\n     override: 'My.Derived2',\n\n     statics: {\n         method: function (x) {\n             return this.callParent([x*2]); // calls My.Derived2.method\n         }\n     }\n });\n\n alert(My.Derived2.method(10); // now alerts 40\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a>/Arguments<div class='sub-desc'><p>The arguments, either an array or the <code>arguments</code> object\nfrom the current method, for example: <code>this.callParent(arguments)</code></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>Returns the result of calling the parent method</p>\n</div></li></ul></div></div></div><div id='method-getInitialConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-method-getInitialConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-getInitialConfig' class='name expandable'>getInitialConfig</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> name</span> )</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-method-initConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-initConfig' class='name expandable'>initConfig</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> config</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Initialize configuration for this class. ...</div><div class='long'><p>Initialize configuration for this class. a typical example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.awesome.Class', {\n    // The default config\n    config: {\n        name: 'Awesome',\n        isAwesome: true\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n    }\n});\n\nvar awesome = new My.awesome.Class({\n    name: 'Super Awesome'\n});\n\nalert(awesome.getName()); // 'Super Awesome'\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>mixins The mixin prototypes as key - value pairs</p>\n</div></li></ul></div></div></div><div id='method-is' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ComponentQuery'>Ext.ComponentQuery</span><br/><a href='source/ComponentQuery.html#Ext-ComponentQuery-method-is' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ComponentQuery-method-is' class='name expandable'>is</a>( <span class='pre'><a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> component, <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> selector</span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></div><div class='description'><div class='short'>Tests whether the passed Component matches the selector string. ...</div><div class='long'><p>Tests whether the passed Component matches the selector string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>component</span> : <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a><div class='sub-desc'><p>The Component to test</p>\n</div></li><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The selector string to test against.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p>True if the Component matches the selector.</p>\n</div></li></ul></div></div></div><div id='method-query' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ComponentQuery'>Ext.ComponentQuery</span><br/><a href='source/ComponentQuery.html#Ext-ComponentQuery-method-query' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ComponentQuery-method-query' class='name expandable'>query</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> selector, <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a> root</span> ) : <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>[]</div><div class='description'><div class='short'>Returns an array of matched Components from within the passed root object. ...</div><div class='long'><p>Returns an array of matched Components from within the passed root object.</p>\n\n<p>This method filters returned Components in a similar way to how CSS selector based DOM\nqueries work using a textual selector string.</p>\n\n<p>See class summary for details.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The selector string to filter returned Components</p>\n</div></li><li><span class='pre'>root</span> : <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Ext.container.Container</a><div class='sub-desc'><p>The Container within which to perform the query.\nIf omitted, all Components within the document are included in the search.</p>\n\n<p>This parameter may also be an array of Components to filter according to the selector.</p></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a>[]</span><div class='sub-desc'><p>The matched Components.</p>\n</div></li></ul></div></div></div><div id='method-statics' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.Base' rel='Ext.Base' class='defined-in docClass'>Ext.Base</a><br/><a href='source/Base.html#Ext-Base-method-statics' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Base-method-statics' class='name expandable'>statics</a>( <span class='pre'></span> ) : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><strong class='protected signature'>protected</strong></div><div class='description'><div class='short'>Get the reference to the class from which this object was instantiated. ...</div><div class='long'><p>Get the reference to the class from which this object was instantiated. Note that unlike <a href=\"#!/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">self</a>,\n<code>this.statics()</code> is scope-independent and it always returns the class from which it was called, regardless of what\n<code>this</code> points to during run-time</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.Cat', {\n    statics: {\n        totalCreated: 0,\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        var statics = this.statics();\n\n        alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to\n                                        // equivalent to: My.Cat.speciesName\n\n        alert(this.self.speciesName);   // dependent on 'this'\n\n        statics.totalCreated++;\n    },\n\n    clone: function() {\n        var cloned = new this.self;                      // dependent on 'this'\n\n        cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName\n\n        return cloned;\n    }\n});\n\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('My.SnowLeopard', {\n    extend: 'My.Cat',\n\n    statics: {\n        speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'\n    },\n\n    constructor: function() {\n        this.callParent();\n    }\n});\n\nvar cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'\n\nvar snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(<a href=\"#!/api/Ext-method-getClassName\" rel=\"Ext-method-getClassName\" class=\"docClass\">Ext.getClassName</a>(clone));         // alerts 'My.SnowLeopard'\nalert(clone.groupName);                 // alerts 'Cat'\n\nalert(My.Cat.totalCreated);             // alerts 3\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","name":"Ext.ComponentQuery","singleton":true,"code_type":"ext_define","subclasses":[],"superclasses":["Ext.Base","Ext.ComponentQuery"],"component":false,"id":"class-Ext.ComponentQuery","mixins":[],"requires":[],"inheritdoc":null});