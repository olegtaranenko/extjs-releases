Ext.data.JsonP.Array({"mixedInto":[],"tagname":"class","meta":{},"allMixins":[],"files":[{"href":"Array.html#Array","filename":"Array.js"}],"aliases":{},"uses":[],"members":{"event":[],"property":[{"meta":{},"tagname":"property","owner":"Array","name":"length","id":"property-length"}],"method":[{"meta":{},"tagname":"method","owner":"Array","name":"constructor","id":"method-constructor"},{"meta":{},"tagname":"method","owner":"Array","name":"concat","id":"method-concat"},{"meta":{},"tagname":"method","owner":"Array","name":"join","id":"method-join"},{"meta":{},"tagname":"method","owner":"Array","name":"pop","id":"method-pop"},{"meta":{},"tagname":"method","owner":"Array","name":"push","id":"method-push"},{"meta":{},"tagname":"method","owner":"Array","name":"reverse","id":"method-reverse"},{"meta":{},"tagname":"method","owner":"Array","name":"shift","id":"method-shift"},{"meta":{},"tagname":"method","owner":"Array","name":"slice","id":"method-slice"},{"meta":{},"tagname":"method","owner":"Array","name":"sort","id":"method-sort"},{"meta":{},"tagname":"method","owner":"Array","name":"splice","id":"method-splice"},{"meta":{},"tagname":"method","owner":"Array","name":"toString","id":"method-toString"},{"meta":{},"tagname":"method","owner":"Array","name":"unshift","id":"method-unshift"}],"css_var":[],"css_mixin":[],"cfg":[]},"inheritable":false,"extends":null,"statics":{"property":[],"event":[],"method":[],"css_var":[],"css_mixin":[],"cfg":[]},"alternateClassNames":[],"private":false,"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Array.html#Array' target='_blank'>Array.js</a></div></pre><div class='doc-contents'><p>In JavaScript, the <code>Array</code> property of the global object is a constructor for\narray instances.</p>\n\n<p>An array is a JavaScript object. Note that you shouldn't use it as an\nassociative array, use <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> instead.</p>\n\n<h1>Creating an Array</h1>\n\n<p>The following example creates an array, msgArray, with a length of 0, then assigns values to\nmsgArray[0] and msgArray[99], changing the length of the array to 100.</p>\n\n<pre><code>var msgArray = new Array();\nmsgArray[0] = \"Hello\";\nmsgArray[99] = \"world\";\n\nif (msgArray.length == 100)\nprint(\"The length is 100.\");\n</code></pre>\n\n<h1>Creating a Two-dimensional Array</h1>\n\n<p>The following creates chess board as a two dimensional array of strings. The first move is made by\ncopying the 'P' in 6,4 to 4,4. The position 4,4 is left blank.</p>\n\n<pre><code>var board =\n[ ['R','N','B','Q','K','B','N','R'],\n['P','P','P','P','P','P','P','P'],\n[' ',' ',' ',' ',' ',' ',' ',' '],\n[' ',' ',' ',' ',' ',' ',' ',' '],\n[' ',' ',' ',' ',' ',' ',' ',' '],\n[' ',' ',' ',' ',' ',' ',' ',' '],\n['p','p','p','p','p','p','p','p'],\n['r','n','b','q','k','b','n','r']];\nprint(board.join('\\n') + '\\n\\n');\n\n// Move King's Pawn forward 2\nboard[4][4] = board[6][4];\nboard[6][4] = ' ';\nprint(board.join('\\n'));\n</code></pre>\n\n<p>Here is the output:</p>\n\n<pre><code>R,N,B,Q,K,B,N,R\nP,P,P,P,P,P,P,P\n , , , , , , ,\n , , , , , , ,\n , , , , , , ,\n , , , , , , ,\np,p,p,p,p,p,p,p\nr,n,b,q,k,b,n,r\n\nR,N,B,Q,K,B,N,R\nP,P,P,P,P,P,P,P\n , , , , , , ,\n , , , , , , ,\n , , , ,p, , ,\n , , , , , , ,\np,p,p,p, ,p,p,p\nr,n,b,q,k,b,n,r\n</code></pre>\n\n<h1>Accessing array elements</h1>\n\n<p>Array elements are nothing less than object properties, so they are accessed as such.</p>\n\n<pre><code>var myArray = new Array(\"Wind\", \"Rain\", \"Fire\");\nmyArray[0]; // \"Wind\"\nmyArray[1]; // \"Rain\"\n// etc.\nmyArray.length; // 3\n\n// Even if indices are properties, the following notation throws a syntax error\nmyArray.2;\n\n// It should be noted that in JavaScript, object property names are strings. Consequently,\nmyArray[0] === myArray[\"0\"];\nmyArray[1] === myArray[\"1\"];\n// etc.\n\n// However, this should be considered carefully\nmyArray[02]; // \"Fire\". The number 02 is converted as the \"2\" string\nmyArray[\"02\"]; // undefined. There is no property named \"02\"\n</code></pre>\n\n<h1>Relationship between length and numerical properties</h1>\n\n<p>An array's length property and numerical properties are connected. Here is some\ncode explaining how this relationship works.</p>\n\n<pre><code>var a = [];\n\na[0] = 'a';\nconsole.log(a[0]); // 'a'\nconsole.log(a.length); // 1\n\na[1] = 32;\nconsole.log(a[1]); // 32\nconsole.log(a.length); // 2\n\na[13] = 12345;\nconsole.log(a[13]); // 12345\nconsole.log(a.length); // 14\n\na.length = 10;\nconsole.log(a[13]); // undefined, when reducing the length elements after length+1 are removed\nconsole.log(a.length); // 10\n</code></pre>\n\n<h1>Creating an array using the result of a match</h1>\n\n<p>The result of a match between a regular expression and a string can create an array.\nThis array has properties and elements that provide information about the match. An\narray is the return value of <a href=\"#!/api/RegExp-method-exec\" rel=\"RegExp-method-exec\" class=\"docClass\">RegExp.exec</a>, <a href=\"#!/api/String-method-match\" rel=\"String-method-match\" class=\"docClass\">String.match</a>, and <a href=\"#!/api/String-method-replace\" rel=\"String-method-replace\" class=\"docClass\">String.replace</a>. To help\nexplain these properties and elements, look at the following example and then refer\nto the table below:</p>\n\n<pre><code>// Match one d followed by one or more b's followed by one d\n// Remember matched b's and the following d\n// Ignore case\n\nvar myRe = /d(b+)(d)/i;\nvar myArray = myRe.exec(\"cdbBdbsbz\");\n</code></pre>\n\n<p>The properties and elements returned from this match are as follows:</p>\n\n<table>\n<thead>\n<tr>\n<th></th>\n<th align=\"left\"> Property/Element </th>\n<th align=\"left\"> Description                                                                           </th>\n<th align=\"left\"> Example</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td></td>\n<td align=\"left\"> <code>input</code>          </td>\n<td align=\"left\"> A read-only property that reflects the original string against which the              </td>\n<td align=\"left\"> cdbBdbsbz</td>\n</tr>\n<tr>\n<td></td>\n<td align=\"left\">                  </td>\n<td align=\"left\"> regular expression was matched.                                                       </td>\n<td></td>\n</tr>\n<tr>\n<td></td>\n<td align=\"left\"> <code>index</code>          </td>\n<td align=\"left\"> A read-only property that is the zero-based index of the match in the string.         </td>\n<td align=\"left\"> 1</td>\n</tr>\n<tr>\n<td></td>\n<td align=\"left\"> <code>[0]</code>            </td>\n<td align=\"left\"> A read-only element that specifies the last matched characters.                       </td>\n<td align=\"left\"> dbBd</td>\n</tr>\n<tr>\n<td></td>\n<td align=\"left\"> <code>[1], ...[n]</code>    </td>\n<td align=\"left\"> Read-only elements that specify the parenthesized substring matches, if included in   </td>\n<td align=\"left\"> [1]: bB [2]: d</td>\n</tr>\n<tr>\n<td></td>\n<td align=\"left\">                  </td>\n<td align=\"left\"> the regular expression. The number of possible parenthesized substrings is unlimited. </td>\n<td></td>\n</tr>\n</tbody>\n</table>\n\n\n<div class=\"notice\">\nDocumentation for this class comes from <a href=\"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array\">MDN</a>\nand is available under <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">Creative Commons: Attribution-Sharealike license</a>.\n</div>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-length' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-property-length' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-property-length' class='name expandable'>length</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'>Reflects the number of elements in an array. ...</div><div class='long'><p>Reflects the number of elements in an array.</p>\n\n<p>The value of the <code>length</code> property is an integer with a positive sign and a value less than 2 to the 32\npower (232).</p>\n\n<p>You can set the <code>length</code> property to truncate an array at any time. When you extend an array by changing\nits <code>length</code> property, the number of actual elements does not increase; for example, if you set <code>length</code>\nto 3 when it is currently 2, the array still contains only 2 elements.</p>\n\n<p>In the following example the array numbers is iterated through by looking at the <code>length</code> property to see\nhow many elements it has. Each value is then doubled.</p>\n\n<pre><code>var numbers = [1,2,3,4,5];\nfor (var i = 0; i &lt; numbers.length; i++) {\n    numbers[i] *= 2;\n}\n// numbers is now [2,4,6,8,10];\n</code></pre>\n\n<p>The following example shortens the array <code>statesUS</code> to a length of 50 if the current <code>length</code> is greater\nthan 50.</p>\n\n<pre><code>if (statesUS.length &gt; 50) {\n    statesUS.length=50\n}\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Array-method-constructor' class='name expandable'>Array</a>( <span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>... items</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Creates new Array object. ...</div><div class='long'><p>Creates new Array object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>items</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>...<div class='sub-desc'><p>Either a number that specifies the length of array or any number of items\nfor the array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-concat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-concat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-concat' class='name expandable'>concat</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>... values</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></div><div class='description'><div class='short'>Returns a new array comprised of this array joined with other array(s) and/or value(s). ...</div><div class='long'><p>Returns a new array comprised of this array joined with other array(s) and/or value(s).</p>\n\n<p><code>concat</code> creates a new array consisting of the elements in the <code>this</code> object on which it is called,\nfollowed in order by, for each argument, the elements of that argument (if the argument is an\narray) or the argument itself (if the argument is not an array).</p>\n\n<p><code>concat</code> does not alter <code>this</code> or any of the arrays provided as arguments but instead returns a\n\"one level deep\" copy that contains copies of the same elements combined from the original arrays.\nElements of the original arrays are copied into the new array as follows:\nObject references (and not the actual object): <code>concat</code> copies object references into the new\narray. Both the original and new array refer to the same object. That is, if a referenced object is\nmodified, the changes are visible to both the new and original arrays.\nStrings and numbers (not <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> and <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> objects): <code>concat</code> copies the values of\nstrings and numbers into the new array.</p>\n\n<p>Any operation on the new array will have no effect on the original arrays, and vice versa.</p>\n\n<h3>Concatenating two arrays</h3>\n\n<p>The following code concatenates two arrays:</p>\n\n<pre><code>var alpha = [\"a\", \"b\", \"c\"];\nvar numeric = [1, 2, 3];\n\n// creates array [\"a\", \"b\", \"c\", 1, 2, 3]; alpha and numeric are unchanged\nvar alphaNumeric = alpha.concat(numeric);\n</code></pre>\n\n<h3>Concatenating three arrays</h3>\n\n<p>The following code concatenates three arrays:</p>\n\n<pre><code>var num1 = [1, 2, 3];\nvar num2 = [4, 5, 6];\nvar num3 = [7, 8, 9];\n\n// creates array [1, 2, 3, 4, 5, 6, 7, 8, 9]; num1, num2, num3 are unchanged\nvar nums = num1.concat(num2, num3);\n</code></pre>\n\n<h3>Concatenating values to an array</h3>\n\n<p>The following code concatenates three values to an array:</p>\n\n<pre><code>var alpha = ['a', 'b', 'c'];\n\n// creates array [\"a\", \"b\", \"c\", 1, 2, 3], leaving alpha unchanged\nvar alphaNumeric = alpha.concat(1, [2, 3]);\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>values</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>...<div class='sub-desc'><p>Arrays and/or values to concatenate to the resulting array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>New array.</p>\n</div></li></ul></div></div></div><div id='method-join' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-join' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-join' class='name expandable'>join</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> separator</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></div><div class='description'><div class='short'>Joins all elements of an array into a string. ...</div><div class='long'><p>Joins all elements of an array into a string.</p>\n\n<p>The string conversions of all array elements are joined into one string.</p>\n\n<p>The following example creates an array, <code>a</code>, with three elements, then joins the array three times:\nusing the default separator, then a comma and a space, and then a plus.</p>\n\n<pre><code>var a = new Array(\"Wind\",\"Rain\",\"Fire\");\nvar myVar1 = a.join();      // assigns \"Wind,Rain,Fire\" to myVar1\nvar myVar2 = a.join(\", \");  // assigns \"Wind, Rain, Fire\" to myVar2\nvar myVar3 = a.join(\" + \"); // assigns \"Wind + Rain + Fire\" to myVar3\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>separator</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Specifies a string to separate each element of the array. The separator\nis converted to a string if necessary. If omitted, the array elements are separated with a comma.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>A string of the array elements.</p>\n</div></li></ul></div></div></div><div id='method-pop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-pop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-pop' class='name expandable'>pop</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>The pop method removes the last element from an array and returns that value to the caller. ...</div><div class='long'><p>The pop method removes the last element from an array and returns that value to the caller.</p>\n\n<p><code>pop</code> is intentionally generic; this method can be called or applied to objects resembling\narrays. Objects which do not contain a length property reflecting the last in a series of\nconsecutive, zero-based numerical properties may not behave in any meaningful manner.</p>\n\n<pre><code>var myFish = [\"angel\", \"clown\", \"mandarin\", \"surgeon\"];\nvar popped = myFish.pop();\nalert(popped); // Alerts 'surgeon'\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The last element in the array</p>\n</div></li></ul></div></div></div><div id='method-push' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-push' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-push' class='name expandable'>push</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>... elements</span> ) : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></div><div class='description'><div class='short'>Adds one or more elements to the end of an array and returns the new length of the array. ...</div><div class='long'><p>Adds one or more elements to the end of an array and returns the new length of the array.</p>\n\n<p><code>push</code> is intentionally generic. This method can be called or applied to objects resembling\narrays. The push method relies on a length property to determine where to start inserting\nthe given values. If the length property cannot be converted into a number, the index used\nis 0. This includes the possibility of length being nonexistent, in which case length will\nalso be created.</p>\n\n<p>The only native, array-like objects are strings, although they are not suitable in\napplications of this method, as strings are immutable.</p>\n\n<h3>Adding elements to an array</h3>\n\n<p>The following code creates the sports array containing two elements, then appends two elements\nto it. After the code executes, sports contains 4 elements: \"soccer\", \"baseball\", \"football\"\nand \"swimming\".</p>\n\n<pre><code>var sports = [\"soccer\", \"baseball\"];\nsports.push(\"football\", \"swimming\");\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>elements</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>...<div class='sub-desc'><p>The elements to add to the end of the array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span><div class='sub-desc'><p>The new length property of the object upon which the method was called.</p>\n</div></li></ul></div></div></div><div id='method-reverse' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-reverse' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-reverse' class='name expandable'>reverse</a>( <span class='pre'></span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></div><div class='description'><div class='short'>Reverses the order of the elements of an array -- the first becomes the last, and the\nlast becomes the first. ...</div><div class='long'><p>Reverses the order of the elements of an array -- the first becomes the last, and the\nlast becomes the first.</p>\n\n<p>The reverse method transposes the elements of the calling array object in place, mutating the\narray, and returning a reference to the array.</p>\n\n<p>The following example creates an array myArray, containing three elements, then reverses the array.</p>\n\n<pre><code>var myArray = [\"one\", \"two\", \"three\"];\nmyArray.reverse();\n</code></pre>\n\n<p>This code changes myArray so that:</p>\n\n<ul>\n<li>myArray[0] is \"three\"</li>\n<li>myArray[1] is \"two\"</li>\n<li>myArray[2] is \"one\"</li>\n</ul>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>A reference to the array</p>\n</div></li></ul></div></div></div><div id='method-shift' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-shift' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-shift' class='name expandable'>shift</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Removes the first element from an array and returns that element. ...</div><div class='long'><p>Removes the first element from an array and returns that element.</p>\n\n<p>The <code>shift</code> method removes the element at the zeroeth index and shifts the values at consecutive\nindexes down, then returns the removed value.</p>\n\n<p><code>shift</code> is intentionally generic; this method can be called or applied to objects resembling\narrays. Objects which do not contain a <code>length</code> property reflecting the last in a series of\nconsecutive, zero-based numerical properties may not behave in any meaningful manner.</p>\n\n<p>The following code displays the <code>myFish</code> array before and after removing its first element. It also\ndisplays the removed element:</p>\n\n<pre><code>// assumes a println function is defined\nvar myFish = [\"angel\", \"clown\", \"mandarin\", \"surgeon\"];\nprintln(\"myFish before: \" + myFish);\nvar shifted = myFish.shift();\nprintln(\"myFish after: \" + myFish);\nprintln(\"Removed this element: \" + shifted);\n</code></pre>\n\n<p>This example displays the following:</p>\n\n<pre><code>myFish before: angel,clown,mandarin,surgeon\nmyFish after: clown,mandarin,surgeon\nRemoved this element: angel\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The first element of the array prior to shifting.</p>\n</div></li></ul></div></div></div><div id='method-slice' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-slice' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-slice' class='name expandable'>slice</a>( <span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> begin, <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> end</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></div><div class='description'><div class='short'>Extracts a section of an array and returns a new array. ...</div><div class='long'><p>Extracts a section of an array and returns a new array.</p>\n\n<p><code>slice</code> does not alter the original array, but returns a new \"one level deep\" copy that contains\ncopies of the elements sliced from the original array. Elements of the original array are copied\ninto the new array as follows:\n*   For object references (and not the actual object), <code>slice</code> copies object references into the\nnew array. Both the original and new array refer to the same object. If a referenced object\nchanges, the changes are visible to both the new and original arrays.\n*   For strings and numbers (not <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> and <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> objects), <code>slice</code> copies strings\nand numbers into the new array. Changes to the string or number in one array does not affect the\nother array.</p>\n\n<p>If a new element is added to either array, the other array is not affected.</p>\n\n<h3>Using slice</h3>\n\n<p>In the following example, <code>slice</code> creates a new array, <code>newCar</code>, from <code>myCar</code>. Both include a\nreference to the object <code>myHonda</code>. When the color of <code>myHonda</code> is changed to purple, both arrays\nreflect the change.</p>\n\n<pre><code>// Using slice, create newCar from myCar.\nvar myHonda = { color: \"red\", wheels: 4, engine: { cylinders: 4, size: 2.2 } };\nvar myCar = [myHonda, 2, \"cherry condition\", \"purchased 1997\"];\nvar newCar = myCar.slice(0, 2);\n\n// Print the values of myCar, newCar, and the color of myHonda\n//  referenced from both arrays.\nprint(\"myCar = \" + myCar.toSource());\nprint(\"newCar = \" + newCar.toSource());\nprint(\"myCar[0].color = \" + myCar[0].color);\nprint(\"newCar[0].color = \" + newCar[0].color);\n\n// Change the color of myHonda.\nmyHonda.color = \"purple\";\nprint(\"The new color of my Honda is \" + myHonda.color);\n\n// Print the color of myHonda referenced from both arrays.\nprint(\"myCar[0].color = \" + myCar[0].color);\nprint(\"newCar[0].color = \" + newCar[0].color);\n</code></pre>\n\n<p>This script writes:</p>\n\n<pre><code>myCar = [{color:\"red\", wheels:4, engine:{cylinders:4, size:2.2}}, 2, \"cherry condition\",\n\"purchased 1997\"]\nnewCar = [{color:\"red\", wheels:4, engine:{cylinders:4, size:2.2}}, 2]\nmyCar[0].color = red\nnewCar[0].color = red\nThe new color of my Honda is purple\nmyCar[0].color = purple\nnewCar[0].color = purple\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>begin</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Zero-based index at which to begin extraction.\nAs a negative index, <code>start</code> indicates an offset from the end of the sequence. <code>slice(-2)</code> extracts\nthe second-to-last element and the last element in the sequence</p>\n</div></li><li><span class='pre'>end</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Zero-based index at which to end extraction. <code>slice</code> extracts up to but not\nincluding <code>end</code>.\n<code>slice(1,4)</code> extracts the second element through the fourth element (elements indexed 1, 2, and 3).\nAs a negative index, end indicates an offset from the end of the sequence. <code>slice(2,-1)</code> extracts\nthe third element through the second-to-last element in the sequence.\nIf <code>end</code> is omitted, <code>slice</code> extracts to the end of the sequence.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>Array from the new start position up to (but not including) the specified end position.</p>\n</div></li></ul></div></div></div><div id='method-sort' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-sort' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-sort' class='name expandable'>sort</a>( <span class='pre'><a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> compareFunction</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></div><div class='description'><div class='short'>Sorts the elements of an array. ...</div><div class='long'><p>Sorts the elements of an array.</p>\n\n<p>If <code>compareFunction</code> is not supplied, elements are sorted by converting them to strings and\ncomparing strings in lexicographic (\"dictionary\" or \"telephone book,\" not numerical) order. For\nexample, \"80\" comes before \"9\" in lexicographic order, but in a numeric sort 9 comes before 80.</p>\n\n<p>If <code>compareFunction</code> is supplied, the array elements are sorted according to the return value of\nthe compare function. If a and b are two elements being compared, then:\nIf <code>compareFunction(a, b)</code> is less than 0, sort <code>a</code> to a lower index than <code>b</code>.\nIf <code>compareFunction(a, b)</code> returns 0, leave <code>a</code> and <code>b</code> unchanged with respect to each other, but\nsorted with respect to all different elements. Note: the ECMAscript standard does not guarantee\nthis behaviour, and thus not all browsers respect this.\nIf <code>compareFunction(a, b)</code> is greater than 0, sort <code>b</code> to a lower index than <code>a</code>.\n<code>compareFunction(a, b)</code> must always returns the same value when given a specific pair of elements a\nand b as its two arguments. If inconsistent results are returned then the sort order is undefined</p>\n\n<p>So, the compare function has the following form:</p>\n\n<pre><code>function compare(a, b)\n{\n    if (a is less than b by some ordering criterion)\n        return -1;\n    if (a is greater than b by the ordering criterion)\n       return 1;\n    // a must be equal to b\n    return 0;\n}\n</code></pre>\n\n<p>To compare numbers instead of strings, the compare function can simply subtract <code>b</code> from <code>a</code>:</p>\n\n<pre><code>function compareNumbers(a, b)\n{\nreturn a - b;\n}\n</code></pre>\n\n<p>The sort() method can be conveniently used with closures:</p>\n\n<pre><code>var numbers = [4, 2, 5, 1, 3];\nnumbers.sort(function(a, b) {\n    return a - b;\n});\nprint(numbers);\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>compareFunction</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>Specifies a function that defines the sort order. If omitted, the\narray is sorted lexicographically (in dictionary order) according to the string conversion of each\nelement.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>A reference to the array</p>\n</div></li></ul></div></div></div><div id='method-splice' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-splice' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-splice' class='name expandable'>splice</a>( <span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> index, <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> howMany, <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>... elements</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></div><div class='description'><div class='short'>Adds and/or removes elements from an array. ...</div><div class='long'><p>Adds and/or removes elements from an array.</p>\n\n<p>If you specify a different number of elements to insert than the number you're removing, the array\nwill have a different length at the end of the call.</p>\n\n<pre><code>// assumes a print function is defined\nvar myFish = [\"angel\", \"clown\", \"mandarin\", \"surgeon\"];\nprint(\"myFish: \" + myFish);\n\nvar removed = myFish.splice(2, 0, \"drum\");\nprint(\"After adding 1: \" + myFish);\nprint(\"removed is: \" + removed);\n\nremoved = myFish.splice(3, 1);\nprint(\"After removing 1: \" + myFish);\nprint(\"removed is: \" + removed);\n\nremoved = myFish.splice(2, 1, \"trumpet\");\nprint(\"After replacing 1: \" + myFish);\nprint(\"removed is: \" + removed);\n\nremoved = myFish.splice(0, 2, \"parrot\", \"anemone\", \"blue\");\nprint(\"After replacing 2: \" + myFish);\nprint(\"removed is: \" + removed);\n</code></pre>\n\n<p>This script displays:</p>\n\n<pre><code>myFish: angel,clown,mandarin,surgeon\nAfter adding 1: angel,clown,drum,mandarin,surgeon\nremoved is:\nAfter removing 1: angel,clown,drum,surgeon\nremoved is: mandarin\nAfter replacing 1: angel,clown,trumpet,surgeon\nremoved is: drum\nAfter replacing 2: parrot,anemone,blue,trumpet,surgeon\nremoved is: angel,clown\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Index at which to start changing the array. If negative, will begin that\nmany elements from the end.</p>\n</div></li><li><span class='pre'>howMany</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>An integer indicating the number of old array elements to remove. If\n<code>howMany</code> is 0, no elements are removed. In this case, you should specify at least one new element.\nIf no <code>howMany</code> parameter is specified all elements after index are removed.</p>\n</div></li><li><span class='pre'>elements</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>...<div class='sub-desc'><p>The elements to add to the array. If you don't specify any\nelements, <code>splice</code> simply removes elements from the array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>An array containing the removed elements. If only one element is removed, an array\nof one element is returned..</p>\n</div></li></ul></div></div></div><div id='method-toString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-toString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-toString' class='name expandable'>toString</a>( <span class='pre'></span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></div><div class='description'><div class='short'>Returns a string representing the array and its elements. ...</div><div class='long'><p>Returns a string representing the array and its elements. Overrides the <code>Object.prototype.toString</code>\nmethod.</p>\n\n<p>The <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a> object overrides the <code>toString</code> method of <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>. For Array objects, the\n<code>toString</code> method joins the array and returns one string containing each array element separated by\ncommas. For example, the following code creates an array and uses <code>toString</code> to convert the array\nto a string.</p>\n\n<pre><code>var monthNames = new Array(\"Jan\",\"Feb\",\"Mar\",\"Apr\");\nmyVar = monthNames.toString(); // assigns \"Jan,Feb,Mar,Apr\" to myVar\n</code></pre>\n\n<p>JavaScript calls the <code>toString</code> method automatically when an array is to be represented as a text\nvalue or when an array is referred to in a string concatenation.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>The array as a string.</p>\n</div></li></ul></div></div></div><div id='method-unshift' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Array'>Array</span><br/><a href='source/Array.html#Array-method-unshift' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Array-method-unshift' class='name expandable'>unshift</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>... elements</span> ) : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></div><div class='description'><div class='short'>Adds one or more elements to the front of an array and returns the new length of the array. ...</div><div class='long'><p>Adds one or more elements to the front of an array and returns the new length of the array.</p>\n\n<p>The <code>unshift</code> method inserts the given values to the beginning of an array-like object.</p>\n\n<p><code>unshift</code> is intentionally generic; this method can be called or applied to objects resembling\narrays. Objects which do not contain a <code>length</code> property reflecting the last in a series of\nconsecutive, zero-based numerical properties may not behave in any meaningful manner.</p>\n\n<p>The following code displays the myFish array before and after adding elements to it.</p>\n\n<pre><code>// assumes a println function exists\nmyFish = [\"angel\", \"clown\"];\nprintln(\"myFish before: \" + myFish);\nunshifted = myFish.unshift(\"drum\", \"lion\");\nprintln(\"myFish after: \" + myFish);\nprintln(\"New length: \" + unshifted);\n</code></pre>\n\n<p>This example displays the following:</p>\n\n<pre><code>myFish before: [\"angel\", \"clown\"]\nmyFish after: [\"drum\", \"lion\", \"angel\", \"clown\"]\nNew length: 4\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>elements</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>...<div class='sub-desc'><p>The elements to add to the front of the array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span><div class='sub-desc'><p>The array's new length.</p>\n</div></li></ul></div></div></div></div></div></div></div>","name":"Array","singleton":false,"code_type":"nop","subclasses":[],"superclasses":[],"component":false,"id":"class-Array","mixins":[],"requires":[],"inheritdoc":null});