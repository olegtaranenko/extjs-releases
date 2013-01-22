Ext.data.JsonP.command_reference({"title":"Sencha Cmd Reference","guide":"<h1>sencha</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/command_reference-section-1'>sencha ant</a></li>\n<li><a href='#!/guide/command_reference-section-2'>sencha app</a></li>\n<li><a href='#!/guide/command_reference-section-3'>sencha app build</a></li>\n<li><a href='#!/guide/command_reference-section-4'>sencha app package</a></li>\n<li><a href='#!/guide/command_reference-section-5'>sencha app package build</a></li>\n<li><a href='#!/guide/command_reference-section-6'>sencha app package generate</a></li>\n<li><a href='#!/guide/command_reference-section-7'>sencha app package run</a></li>\n<li><a href='#!/guide/command_reference-section-8'>sencha app refresh</a></li>\n<li><a href='#!/guide/command_reference-section-9'>sencha app resolve</a></li>\n<li><a href='#!/guide/command_reference-section-10'>sencha app upgrade</a></li>\n<li><a href='#!/guide/command_reference-section-11'>sencha build</a></li>\n<li><a href='#!/guide/command_reference-section-12'>sencha compile</a></li>\n<li><a href='#!/guide/command_reference-section-13'>sencha compile concatenate</a></li>\n<li><a href='#!/guide/command_reference-section-14'>sencha compile exclude</a></li>\n<li><a href='#!/guide/command_reference-section-15'>sencha compile include</a></li>\n<li><a href='#!/guide/command_reference-section-16'>sencha compile intersect</a></li>\n<li><a href='#!/guide/command_reference-section-17'>sencha compile metadata</a></li>\n<li><a href='#!/guide/command_reference-section-18'>sencha compile page</a></li>\n<li><a href='#!/guide/command_reference-section-19'>sencha compile restore</a></li>\n<li><a href='#!/guide/command_reference-section-20'>sencha compile save</a></li>\n<li><a href='#!/guide/command_reference-section-21'>sencha compile show-ignored</a></li>\n<li><a href='#!/guide/command_reference-section-22'>sencha compile union</a></li>\n<li><a href='#!/guide/command_reference-section-23'>sencha config</a></li>\n<li><a href='#!/guide/command_reference-section-24'>sencha fs</a></li>\n<li><a href='#!/guide/command_reference-section-25'>sencha fs concatenate</a></li>\n<li><a href='#!/guide/command_reference-section-26'>sencha fs difference</a></li>\n<li><a href='#!/guide/command_reference-section-27'>sencha fs minify</a></li>\n<li><a href='#!/guide/command_reference-section-28'>sencha generate</a></li>\n<li><a href='#!/guide/command_reference-section-29'>sencha generate app</a></li>\n<li><a href='#!/guide/command_reference-section-30'>sencha generate controller</a></li>\n<li><a href='#!/guide/command_reference-section-31'>sencha generate form</a></li>\n<li><a href='#!/guide/command_reference-section-32'>sencha generate model</a></li>\n<li><a href='#!/guide/command_reference-section-33'>sencha generate profile</a></li>\n<li><a href='#!/guide/command_reference-section-34'>sencha generate theme</a></li>\n<li><a href='#!/guide/command_reference-section-35'>sencha generate view</a></li>\n<li><a href='#!/guide/command_reference-section-36'>sencha generate workspace</a></li>\n<li><a href='#!/guide/command_reference-section-37'>sencha help</a></li>\n<li><a href='#!/guide/command_reference-section-38'>sencha js</a></li>\n<li><a href='#!/guide/command_reference-section-39'>sencha manifest</a></li>\n<li><a href='#!/guide/command_reference-section-40'>sencha manifest create</a></li>\n<li><a href='#!/guide/command_reference-section-41'>sencha theme</a></li>\n<li><a href='#!/guide/command_reference-section-42'>sencha theme build</a></li>\n<li><a href='#!/guide/command_reference-section-43'>sencha which</a></li>\n</ol>\n</div>\n\n<h2 id='command_reference-section-1'>sencha ant</h2>\n\n<p>Invokes Apache Ant providing the <code>cmd.dir</code> property to access Sencha Cmd using\nthe following <code>taskdef</code>:</p>\n\n<pre><code>&lt;taskdef resource=\"com/sencha/ant/antlib.xml\"\n         classpath=\"${cmd.dir}/sencha.jar\"/&gt;\n</code></pre>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--debug</code>, <code>-d</code> - enables ant debugging</li>\n<li><code>--file</code>, <code>-f</code> - Sets the ant file to execute</li>\n<li><code>--props</code>, <code>-p</code> - set properties for the ant script (name:value,...)</li>\n<li><code>--target</code>, <code>-t</code> - target(s) to execute within the ant script (comma separated)</li>\n<li><code>--verbose</code>, <code>-v</code> - enables ant verbose debugging</li>\n</ul>\n\n\n<h2 id='command_reference-section-2'>sencha app</h2>\n\n<p>This category contains various commands for application management.</p>\n\n<h3>Categories</h3>\n\n<ul>\n<li><code>package</code> - Packages a Sencha Touch application for native app stores</li>\n</ul>\n\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>build</code> - Executes the build process for an application</li>\n<li><code>refresh</code> - Updates the application metadata (aka \"bootstrap\") file</li>\n<li><code>resolve</code> - Generate a list of dependencies in the exact loading order for the given application.</li>\n<li><code>upgrade</code> - Upgrade the given application to the SDK at the current working directory</li>\n</ul>\n\n\n<h2 id='command_reference-section-3'>sencha app build</h2>\n\n<p>This command builds the current application.</p>\n\n<p>This command also supports ant invocation.</p>\n\n<pre><code>sencha ant [production|testing|native|package] build\n</code></pre>\n\n<p>To tune the process, start by looking at the generated <code>build.xml</code> in your\napplication folder.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--archive</code>, <code>-a</code> - The directory path where all previous builds were stored.</li>\n<li><code>--destination</code>, <code>-d</code> - The directory path to build this application to. Default: build</li>\n<li><code>--environment</code>, <code>-e</code> - The build environment, either 'testing', 'production', 'package' (Touch Specific), or 'native' (Touch Specific).</li>\n<li><code>--run</code>, <code>-r</code> - Enables automatically running builds with the native packager</li>\n</ul>\n\n\n<h2 id='command_reference-section-4'>sencha app package</h2>\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>build</code> - Packages an app with the given configuration file</li>\n<li><code>generate</code> - Generates a Packager configuration JSON file</li>\n<li><code>run</code> - Packages and tries to run the application for the given configuration JSON file</li>\n</ul>\n\n\n<h2 id='command_reference-section-5'>sencha app package build</h2>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--path</code>, <code>-p</code> - the path to the configuration file</li>\n</ul>\n\n\n<h2 id='command_reference-section-6'>sencha app package generate</h2>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--path</code>, <code>-p</code> - the path to the configuration file</li>\n</ul>\n\n\n<h2 id='command_reference-section-7'>sencha app package run</h2>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--path</code>, <code>-p</code> - the path to the configuration file</li>\n</ul>\n\n\n<h2 id='command_reference-section-8'>sencha app refresh</h2>\n\n<p>This command regenerates the metadata file containing \"bootstrap\" data for the\ndynamic loader and class system.</p>\n\n<p>This must be done any time a class is added, renamed or removed.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--base-path</code>, <code>-b</code> - the base path to use to calculate relative path information. Defaults to index.html directory</li>\n<li><code>--metadata-file</code>, <code>-m</code> - the output filename for the js file containing the manifest metadata</li>\n</ul>\n\n\n<h2 id='command_reference-section-9'>sencha app resolve</h2>\n\n<p>Generate a list of dependencies in the exact loading order for the current\napplication.</p>\n\n<p>NOTE: the resolved paths are relative to the current application's HTML file.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--output-file</code>, <code>-o</code> - The file path to write the results to in JSON format.</li>\n<li><code>--uri</code>, <code>-u</code> - The URI to the application\\'s HTML document</li>\n</ul>\n\n\n<h2 id='command_reference-section-10'>sencha app upgrade</h2>\n\n<p>This command upgrades the current application (based on current directory) to a\nspecified new framework.</p>\n\n<pre><code>sencha app upgrade /path/to/sdk\n</code></pre>\n\n<p>NOTE: This will upgrade the framework used by the current application in the\ncurrent workspace. This will effect any other applications in this workspace\nusing the same framework (i.e., \"ext\" or \"touch\").</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--path</code>, <code>-pa</code> - The directory path to the framework to upgrade to</li>\n</ul>\n\n\n<h2 id='command_reference-section-11'>sencha build</h2>\n\n<p>This command is used to process a legacy JSBuilder (\"jsb\") file.</p>\n\n<p>DEPRECATED: This command is provided for backwards compatibility with previous\nreleases. It is highly recommended to migrate applications to the new <code>compile</code>\ncommand and discontinue use of this command.</p>\n\n<h2 id='command_reference-section-12'>sencha compile</h2>\n\n<p>This command category provides JavaScript compilation commands. The <code>compile</code>\ncategory maintains compilation state across its sub-commands so using <code>and</code> to\nconnect sub-commands can provide significant time savings compared to making\nrepeated calls.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--classpath</code>, <code>-cl</code> - adds folder(s) to the class path</li>\n<li><code>--debug</code>, <code>-deb</code> - enables the debug option for the js directive parser</li>\n<li><code>--deferred-overrides</code>, <code>-def</code> - enable / disable deferred override processing (use with optimize)</li>\n<li><code>--ignore</code>, <code>-ig</code> - excludes files with names containing the given substrings from the class path (comma separated)</li>\n<li><code>--options</code>, <code>-o</code> - sets options for the js directive parser (name:value,...)</li>\n</ul>\n\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>concatenate</code> - produce a concatenated build</li>\n<li><code>exclude</code> - exclude files from the compilation set</li>\n<li><code>include</code> - include files into the compilation set</li>\n<li><code>intersect</code> - create a new save set by intersecting existing sets</li>\n<li><code>metadata</code> - produce class metadata</li>\n<li><code>page</code> - compiles a page</li>\n<li><code>restore</code> - alias for 'exclude +all and include -set=<set-name>'</li>\n<li><code>save</code> - remembers the currently enabled file state by a name</li>\n<li><code>show-ignored</code> - displays ignored files from the current classpath</li>\n<li><code>union</code> - alias for 'exclude +all and include ...'</li>\n</ul>\n\n\n<h2 id='command_reference-section-13'>sencha compile concatenate</h2>\n\n<p>This command writes the current set to the specified output file.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--append</code>, <code>-a</code> - Appends output to output file instead of overwriting output file</li>\n<li><code>--closure</code>, <code>-cl</code> - Compress generate file using Closure Compiler</li>\n<li><code>--compress</code>, <code>-co</code> - Compress generated file using default compressor (YUI)</li>\n<li><code>--output-file</code>, <code>-o</code> - the output file name</li>\n<li><code>--strip-comments</code>, <code>-str</code> - Strip comments from the generated file</li>\n<li><code>--uglify</code>, <code>-u</code> - Compress generate file using uglify-js</li>\n<li><code>--yui</code>, <code>-y</code> - Compress generated file using YUI Compressor</li>\n</ul>\n\n\n<h2 id='command_reference-section-14'>sencha compile exclude</h2>\n\n<p>This command removes from the current set any files matching the criteria.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--all</code>, <code>-a</code> - select all files in global cache (ignores other options)</li>\n<li><code>--class</code>, <code>-c</code> - Selects files according to the specified class names</li>\n<li><code>--file</code>, <code>-f</code> - Selects the specified file names (supports glob patterns)</li>\n<li><code>--namespace</code>, <code>-na</code> - Selects all files with class definitions in the given namespace(s)</li>\n<li><code>--not</code>, <code>-no</code> - inverts the matching criteria</li>\n<li><code>--recursive</code>, <code>-r</code> - Enable traversal of dependency relationships when selecting files</li>\n<li><code>--set</code>, <code>-s</code> - Selects files based on a previously named set created via a 'save' command (ignores other options)</li>\n<li><code>--tag</code>, <code>-t</code> - Selects all files with the specified '//@tag' values</li>\n</ul>\n\n\n<h2 id='command_reference-section-15'>sencha compile include</h2>\n\n<p>This command adds the files matching the criteria to the current set.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--all</code>, <code>-a</code> - select all files in global cache (ignores other options)</li>\n<li><code>--class</code>, <code>-c</code> - Selects files according to the specified class names</li>\n<li><code>--file</code>, <code>-f</code> - Selects the specified file names (supports glob patterns)</li>\n<li><code>--namespace</code>, <code>-na</code> - Selects all files with class definitions in the given namespace(s)</li>\n<li><code>--not</code>, <code>-no</code> - inverts the matching criteria</li>\n<li><code>--recursive</code>, <code>-r</code> - Enable traversal of dependency relationships when selecting files</li>\n<li><code>--set</code>, <code>-s</code> - Selects files based on a previously named set created via a 'save' command (ignores other options)</li>\n<li><code>--tag</code>, <code>-t</code> - Selects all files with the specified '//@tag' values</li>\n</ul>\n\n\n<h2 id='command_reference-section-16'>sencha compile intersect</h2>\n\n<p>This command produces as in the current set the files that are contained in all\nof the specified input sets. Alternatively, this command can include files that\nare present in a present in a certain minimum number of sets.</p>\n\n<p>This command only operates on saved sets (unlike most other set operations).</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--min-match</code>, <code>-m</code> - sets the minimum number of sets containing a file to cause a match (-1 = all)</li>\n<li><code>--name</code>, <code>-n</code> - the name of the resultant intersected set</li>\n<li><code>--sets</code>, <code>-s</code> - intersects the specified sets</li>\n</ul>\n\n\n<h2 id='command_reference-section-17'>sencha compile metadata</h2>\n\n<p>This command generates various forms of metadata extracted from the current set\nof files. This data can be exported in various formats (e.g., JSON or JSONP).</p>\n\n<h3>Options</h3>\n\n<h4>Data Type</h4>\n\n<p>Choose one of the following options</p>\n\n<ul>\n<li><code>--alias</code>, <code>-ali</code> - Generate class name to alias information</li>\n<li><code>--alternates</code>, <code>-alt</code> - Generate class alternate name information</li>\n<li><code>--definitions</code>, <code>-d</code> - Generate symbol information</li>\n<li><code>--filenames</code>, <code>-f</code> - Generate source file name information</li>\n<li><code>--loader-paths</code>, <code>-l</code> - Generate dynamic loader path information</li>\n<li><code>--manifest</code>, <code>-m</code> - Generate a class definition manifest file</li>\n</ul>\n\n\n<h4>Format</h4>\n\n<p>Choose one of the following options</p>\n\n<ul>\n<li><code>--json</code>, <code>-json</code> - Generate data in JSON format</li>\n<li><code>--jsonp</code>, <code>-jsonp</code> - Generate data in JSONP format using the given function</li>\n<li><code>--tpl</code>, <code>-t</code> - The line template for generating filenames as text (e.g. <script src=\"{0}\"></script>)</li>\n</ul>\n\n\n<h4>Misc</h4>\n\n<ul>\n<li><code>--append</code>, <code>-ap</code> - Appends output to output file instead of overwriting output file</li>\n<li><code>--base-path</code>, <code>-b</code> - Set the base path for relative path references</li>\n<li><code>--output-file</code>, <code>-o</code> - the output file name</li>\n<li><code>--separator</code>, <code>-s</code> - The delimiter character used to separate multiple templates</li>\n</ul>\n\n\n<h2 id='command_reference-section-18'>sencha compile page</h2>\n\n<p>This command processes a markup file as input and generates an output file with\ncertain sections rewritten.</p>\n\n<p>If the <code>-name</code> option is specified, the dependency graph of all required files\nis saved as a file set with that name (see also the <code>save</code> command).</p>\n\n<p>If the <code>-name</code> option is not specified, all required files are instead written\nto the \"all-classes.js\" file.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--append</code>, <code>-ap</code> - Appends output to output file instead of overwriting output file</li>\n<li><code>--classes-file</code>, <code>-cla</code> - the name of the js file containing the concatenated output</li>\n<li><code>--closure</code>, <code>-clo</code> - Compress generate file using Closure Compiler</li>\n<li><code>--compress</code>, <code>-co</code> - Compress generated file using default compressor (YUI)</li>\n<li><code>--input-file</code>, <code>-i</code> - the html page to process</li>\n<li><code>--name</code>, <code>-n</code> - sets a reference name for the page</li>\n<li><code>--output-page</code>, <code>-o</code> - the output html page</li>\n<li><code>--scripts</code>, <code>-sc</code> - inject the given script path into the generated markup ahead of the all classes file</li>\n<li><code>--strip-comments</code>, <code>-str</code> - Strip comments from the generated file</li>\n<li><code>--uglify</code>, <code>-u</code> - Compress generate file using uglify-js</li>\n<li><code>--yui</code>, <code>-y</code> - Compress generated file using YUI Compressor</li>\n</ul>\n\n\n<h2 id='command_reference-section-19'>sencha compile restore</h2>\n\n<p>This command restores a saved set as the current set.</p>\n\n<h2 id='command_reference-section-20'>sencha compile save</h2>\n\n<p>This command saves the current set with the specified name. A saved set can be\nused as a criteria for set operations (e.g., <code>include</code>) via the <code>-set</code> option.\nA saved set can also be restored as the current set via the <code>restore</code> command.</p>\n\n<h2 id='command_reference-section-21'>sencha compile show-ignored</h2>\n\n<p>Displays a list of all files found in the <code>classpath</code> but matching an <code>-ignore</code>\ncriteria.</p>\n\n<h2 id='command_reference-section-22'>sencha compile union</h2>\n\n<p>This command adds files matching the criteria to the current set. This is\nsimilar to the <code>include</code> command except that this command first removes all\nfiles from the current set. In other words, this command makes the current set\nequal to only those files that match the criteria.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--all</code>, <code>-a</code> - select all files in global cache (ignores other options)</li>\n<li><code>--class</code>, <code>-c</code> - Selects files according to the specified class names</li>\n<li><code>--file</code>, <code>-f</code> - Selects the specified file names (supports glob patterns)</li>\n<li><code>--namespace</code>, <code>-na</code> - Selects all files with class definitions in the given namespace(s)</li>\n<li><code>--not</code>, <code>-no</code> - inverts the matching criteria</li>\n<li><code>--recursive</code>, <code>-r</code> - Enable traversal of dependency relationships when selecting files</li>\n<li><code>--set</code>, <code>-s</code> - Selects files based on a previously named set created via a 'save' command (ignores other options)</li>\n<li><code>--tag</code>, <code>-t</code> - Selects all files with the specified '//@tag' values</li>\n</ul>\n\n\n<h2 id='command_reference-section-23'>sencha config</h2>\n\n<p>This command can be used to either set configuration options singly or load a\nconfiguration file to set multiple options.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--file</code>, <code>-f</code> - Specifies a config file to load</li>\n<li><code>--prop</code>, <code>-p</code> - Specifies a configuration property and value to set</li>\n</ul>\n\n\n<h2 id='command_reference-section-24'>sencha fs</h2>\n\n<p>This category provides commands for manipulating files.</p>\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>concatenate</code> - Concatenate multiple files into one</li>\n<li><code>difference</code> - Generates deltas between two files in JSON format</li>\n<li><code>minify</code> - Minify a JavaScript file, currently support YUICompressor (default), Closure Compiler and UglifyJS</li>\n</ul>\n\n\n<h2 id='command_reference-section-25'>sencha fs concatenate</h2>\n\n<p>This command combines multiple input files into a single output file.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--from</code>, <code>-f</code> - List of files to concatenate, comma-separated</li>\n<li><code>--to</code>, <code>-t</code> - The destination file to write concatenated content</li>\n</ul>\n\n\n<h2 id='command_reference-section-26'>sencha fs difference</h2>\n\n<p>This command produces a delta (or \"patch\") file between input files.</p>\n\n<h2 id='command_reference-section-27'>sencha fs minify</h2>\n\n<p>This command produced minified files using various back-end compressors.</p>\n\n<h2 id='command_reference-section-28'>sencha generate</h2>\n\n<p>This category contains code generators used to generate applications as well\nas add new classes to the application.</p>\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>app</code> - Generates a starter application</li>\n<li><code>controller</code> - Generates a Controller for the current application</li>\n<li><code>form</code> - Generates a Form for the current application (Touch Specific)</li>\n<li><code>model</code> - Generates a Model for the current application</li>\n<li><code>profile</code> - Generates a Profile for the current application (Touch Specific)</li>\n<li><code>theme</code> - Generates a theme page for slice operations (ExtJS Specific)</li>\n<li><code>view</code> - Generates a View for the current application (ExtJS Specific</li>\n<li><code>workspace</code> - Initializes a multi-app workspace</li>\n</ul>\n\n\n<h2 id='command_reference-section-29'>sencha generate app</h2>\n\n<p>This command generates an empty application given a name and target folder.</p>\n\n<p>The application can be extended using other <code>sencha generate</code> commands (e.g.,\n<code>sencha generate model</code>).</p>\n\n<p>Other application actions are provided in the <code>sencha app</code> category (e.g.,\n<code>sencha app build</code>).</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--controller-name</code>, <code>-c</code> - The name of the default Controller</li>\n<li><code>--library</code>, <code>-l</code> - the pre-built library to use (core or all). Default: core</li>\n<li><code>--path</code>, <code>-pa</code> - The path for the generated application</li>\n<li><code>--theme-name</code>, <code>-t</code> - The name of the defualt Theme</li>\n<li><code>--view-name</code>, <code>-v</code> - The name of the defalut View</li>\n</ul>\n\n\n<h2 id='command_reference-section-30'>sencha generate controller</h2>\n\n<p>This command generates a new Controller and adds it to the current application.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--name</code>, <code>-n</code> - The name of the Controller to generate</li>\n</ul>\n\n\n<h2 id='command_reference-section-31'>sencha generate form</h2>\n\n<p>This command generates a new form and adds it to the current application.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--fields</code>, <code>-f</code> - Comma separated list of \"name:type\" field pairs</li>\n<li><code>--name</code>, <code>-n</code> - The name of the Form to generate</li>\n<li><code>--xtype</code>, <code>-x</code> - the xtype for the form.  Defaults to the lowercase form of the name.</li>\n</ul>\n\n\n<h2 id='command_reference-section-32'>sencha generate model</h2>\n\n<p>This command generates a new Model class and adds it to the current application.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--fields</code>, <code>-f</code> - Comma separated list of \"name:type\" field pairs</li>\n<li><code>--name</code>, <code>-n</code> - The name of the Model to generate</li>\n</ul>\n\n\n<h2 id='command_reference-section-33'>sencha generate profile</h2>\n\n<p>This command generates a new Profile and adds it to the current application.</p>\n\n<p>NOTE: Sencha Touch only.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--name</code>, <code>-n</code> - The name of the Profile to generate</li>\n</ul>\n\n\n<h2 id='command_reference-section-34'>sencha generate theme</h2>\n\n<p>This command generates a new Theme and adds it to the current application.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--name</code>, <code>-n</code> - The name of the Theme to generate</li>\n</ul>\n\n\n<h2 id='command_reference-section-35'>sencha generate view</h2>\n\n<p>This command generates a new View class and adds it to the current application.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--name</code>, <code>-n</code> - The name of the View to generate</li>\n</ul>\n\n\n<h2 id='command_reference-section-36'>sencha generate workspace</h2>\n\n<p>This command generates a workspace for managing shared code across pages or\napplications.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--path</code>, <code>-pa</code> - Sets the target path for the workspace</li>\n</ul>\n\n\n<h2 id='command_reference-section-37'>sencha help</h2>\n\n<p>The <code>help</code> command generates help for other commands.</p>\n\n<h3>Usage</h3>\n\n<p>sencha help <command></p>\n\n<h2 id='command_reference-section-38'>sencha js</h2>\n\n<p>This command loads and executes the specified JavaScript source file or files.</p>\n\n<pre><code>sencha js file.js[,file2.js,...] [arg1 [arg2 ...] ]\n</code></pre>\n\n<h4>Files</h4>\n\n<p>The first argument to this command is the file or files to execute. If there\nare multiple files, separate them with commas. In addition to the command line\ntechnique of specifying files, this command also recognizes the following\ndirective:</p>\n\n<pre><code>//@require ../path/to/source.js\n</code></pre>\n\n<p>This form of <code>require</code> directive uses a relative path based on the file that\ncontains the directive. Any given file will only be executed once, in much the\nsame manner as the compiler.</p>\n\n<h4>Context</h4>\n\n<p>A primitive <code>console</code> object with the following methods is provided to the\nJavaScript execution context:</p>\n\n<ul>\n<li><code>log</code></li>\n<li><code>debug</code></li>\n<li><code>info</code></li>\n<li><code>warn</code></li>\n<li><code>error</code></li>\n<li><code>dir</code></li>\n<li><code>trace</code></li>\n<li><code>time</code> / <code>timeEnd</code></li>\n</ul>\n\n\n<p>Arguments beyond the first can be accessed in JavaScript with the global <code>$args</code>\narray. The current directory can be accessed with <code>$curdir</code>.</p>\n\n<p>The Sencha Cmd object can be accessed with <code>sencha</code>. This object has a <code>version</code>\nproperty and a <code>dispatch</code> method.</p>\n\n<pre><code>if (sencha.version.compareTo('3.0.0.210') &lt; 0) {\n    console.warn('Some message');\n} else {\n    // dispatch any command provided by Cmd:\n    sencha.dispatch([ 'app', 'build', $args[1] ]);\n}\n</code></pre>\n\n<p>Beyond the above, the executing JavaScript has full access to the JRE using\nthe <code>importPackage</code> and <code>importClass</code> methods.</p>\n\n<p>For example:</p>\n\n<pre><code>importPackage(java.io);\n\nvar f = new File('somefile.txt');  // create a java.io.File object\n</code></pre>\n\n<p>For further details on the JavaScript engine provided by Java, consult the\nJava Scripting guide:</p>\n\n<p>http://docs.oracle.com/javase/6/docs/technotes/guides/scripting/programmer_guide/index.html</p>\n\n<h2 id='command_reference-section-39'>sencha manifest</h2>\n\n<p>This category provides commands to manage application manifests.</p>\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>create</code> - Generate a list of metadata for all classes found in the given directories</li>\n</ul>\n\n\n<h2 id='command_reference-section-40'>sencha manifest create</h2>\n\n<p>This command generates a list of metadata for all classes.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--output-path</code>, <code>-o</code> - The file path to write the results to in JSON format.</li>\n<li><code>--path</code>, <code>-p</code> - The directory path(s) that contains all classes</li>\n</ul>\n\n\n<h2 id='command_reference-section-41'>sencha theme</h2>\n\n<p>This category contains commands for managing themes.</p>\n\n<h3>Commands</h3>\n\n<ul>\n<li><code>build</code> - Builds a custom theme from a given page</li>\n</ul>\n\n\n<h2 id='command_reference-section-42'>sencha theme build</h2>\n\n<p>This command will build the specified theme's image sprites.</p>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--output-path</code>, <code>-o</code> - the destination path for the sliced images</li>\n<li><code>--page</code>, <code>-p</code> - the page to slice</li>\n<li><code>--theme-name</code>, <code>-t</code> - The name of the theme to build</li>\n</ul>\n\n\n<h2 id='command_reference-section-43'>sencha which</h2>\n\n<h3>Options</h3>\n\n<ul>\n<li><code>--output</code>, <code>-o</code> - Name of an output property file to write the location as a property</li>\n<li><code>--property</code>, <code>-p</code> - Name of the property to write to the output property file for the location</li>\n</ul>\n\n"});