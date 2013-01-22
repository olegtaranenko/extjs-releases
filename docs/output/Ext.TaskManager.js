Ext.data.JsonP.Ext_TaskManager({"mixedInto":[],"tagname":"class","meta":{},"allMixins":[],"files":[{"href":"TaskManager.html#Ext-TaskManager","filename":"TaskManager.js"}],"aliases":{},"uses":[],"members":{"event":[],"property":[],"method":[{"meta":{},"tagname":"method","owner":"Ext.util.TaskRunner","name":"constructor","id":"method-constructor"},{"meta":{},"tagname":"method","owner":"Ext.util.TaskRunner","name":"start","id":"method-start"},{"meta":{},"tagname":"method","owner":"Ext.util.TaskRunner","name":"stop","id":"method-stop"},{"meta":{},"tagname":"method","owner":"Ext.util.TaskRunner","name":"stopAll","id":"method-stopAll"}],"css_var":[],"css_mixin":[],"cfg":[]},"inheritable":false,"extends":"Ext.util.TaskRunner","statics":{"property":[],"event":[],"method":[],"css_var":[],"css_mixin":[],"cfg":[]},"alternateClassNames":[],"private":false,"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Ext.util.TaskRunner' rel='Ext.util.TaskRunner' class='docClass'>Ext.util.TaskRunner</a><div class='subclass '><strong>Ext.TaskManager</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/TaskManager.html#Ext-TaskManager' target='_blank'>TaskManager.js</a></div></pre><div class='doc-contents'><p>A static <a href=\"#!/api/Ext.util.TaskRunner\" rel=\"Ext.util.TaskRunner\" class=\"docClass\">Ext.util.TaskRunner</a> instance that can be used to start and stop arbitrary tasks.  See\n<a href=\"#!/api/Ext.util.TaskRunner\" rel=\"Ext.util.TaskRunner\" class=\"docClass\">Ext.util.TaskRunner</a> for supported methods and task config properties.</p>\n\n<pre><code>// Start a simple clock task that updates a div once per second\nvar task = {\n    run: function(){\n        <a href=\"#!/api/Ext-method-fly\" rel=\"Ext-method-fly\" class=\"docClass\">Ext.fly</a>('clock').update(new Date().format('g:i:s A'));\n    },\n    interval: 1000 //1 second\n}\n<a href=\"#!/api/Ext.TaskManager-method-start\" rel=\"Ext.TaskManager-method-start\" class=\"docClass\">Ext.TaskManager.start</a>(task);\n</code></pre>\n\n\n<p>See the <a href=\"#!/api/Ext.TaskManager-method-start\" rel=\"Ext.TaskManager-method-start\" class=\"docClass\">start</a> method for details about how to configure a task object.</p>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.TaskRunner' rel='Ext.util.TaskRunner' class='defined-in docClass'>Ext.util.TaskRunner</a><br/><a href='source/TaskManager.html#Ext-util-TaskRunner-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Ext.util.TaskRunner-method-constructor' class='name expandable'>Ext.TaskManager</a>( <span class='pre'>[<a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> interval]</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>interval</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> (optional)<div class='sub-desc'><p>The minimum precision in milliseconds supported by this TaskRunner instance</p>\n<p>Defaults to: <code>10</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-start' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.TaskRunner' rel='Ext.util.TaskRunner' class='defined-in docClass'>Ext.util.TaskRunner</a><br/><a href='source/TaskManager.html#Ext-util-TaskRunner-method-start' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.util.TaskRunner-method-start' class='name expandable'>start</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> task</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Starts a new task. ...</div><div class='long'><p>Starts a new task.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>task</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>A config object that supports the following properties:<ul>\n<li><code>run</code> : Function<div class=\"sub-desc\"><p>The function to execute each time the task is invoked. The\nfunction will be called at each interval and passed the <code>args</code> argument if specified, and the\ncurrent invocation count if not.</p>\n<p>If a particular scope (<code>this</code> reference) is required, be sure to specify it using the <code>scope</code> argument.</p>\n<p>Return <code>false</code> from this function to terminate the task.</p></div></li>\n<li><code>interval</code> : Number<div class=\"sub-desc\">The frequency in milliseconds with which the task\nshould be invoked.</div></li>\n<li><code>args</code> : Array<div class=\"sub-desc\">(optional) An array of arguments to be passed to the function\nspecified by <code>run</code>. If not specified, the current invocation count is passed.</div></li>\n<li><code>scope</code> : Object<div class=\"sub-desc\">(optional) The scope (<tt>this</tt> reference) in which to execute the\n<code>run</code> function. Defaults to the task config object.</div></li>\n<li><code>duration</code> : Number<div class=\"sub-desc\">(optional) The length of time in milliseconds to invoke\nthe task before stopping automatically (defaults to indefinite).</div></li>\n<li><code>repeat</code> : Number<div class=\"sub-desc\">(optional) The number of times to invoke the task before\nstopping automatically (defaults to indefinite).</div></li>\n</ul></p>\n\n\n<p>Before each invocation, Ext injects the property <code>taskRunCount</code> into the task object so\nthat calculations based on the repeat count can be performed.</p>\n\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The task</p>\n</div></li></ul></div></div></div><div id='method-stop' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.TaskRunner' rel='Ext.util.TaskRunner' class='defined-in docClass'>Ext.util.TaskRunner</a><br/><a href='source/TaskManager.html#Ext-util-TaskRunner-method-stop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.util.TaskRunner-method-stop' class='name expandable'>stop</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> task</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Stops an existing running task. ...</div><div class='long'><p>Stops an existing running task.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>task</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The task to stop</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The task</p>\n</div></li></ul></div></div></div><div id='method-stopAll' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.TaskRunner' rel='Ext.util.TaskRunner' class='defined-in docClass'>Ext.util.TaskRunner</a><br/><a href='source/TaskManager.html#Ext-util-TaskRunner-method-stopAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.util.TaskRunner-method-stopAll' class='name expandable'>stopAll</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Stops all tasks that are currently running. ...</div><div class='long'><p>Stops all tasks that are currently running.</p>\n</div></div></div></div></div></div></div>","name":"Ext.TaskManager","singleton":true,"code_type":"assignment","subclasses":[],"superclasses":["Ext.util.TaskRunner","Ext.TaskManager"],"component":false,"id":"class-Ext.TaskManager","mixins":[],"requires":[],"inheritdoc":null});