Angular Loading Promise
==========================

Angular Loading Promise is an easy-to-use solution for making a
loading spinner for your angular application.

Demonstration
---------------

 * [Demonstration](https://dl.dropboxusercontent.com/u/2152786/public/angular-loading-promise/index.html)

Getting Started
-----------------

Using Angular Loading Promise is pretty easy. The below example show how it work without coding in Javascript :

<br/>&lt;html&nbsp;ng-app=&quot;bn.loadingPromise&quot;&gt;<br/>&lt;head&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;Demo1&nbsp;-&nbsp;Use&nbsp;it&nbsp;without&nbsp;coding&lt;/title&gt;<br/>&lt;/head&gt;<br/>&lt;script&nbsp;src=&quot;lib/angular.js&quot;&gt;&lt;/script&gt;<br/>&lt;script&nbsp;src=&quot;../src/bnloadingpromise.js&quot;&gt;&lt;/script&gt;<br/><br/>&lt;body&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;bn-promise-show=&quot;loading&quot;&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading&nbsp;&lt;span&nbsp;bn-promise-show=&quot;loading&quot;&gt;&lt;img&nbsp;src=&quot;assets/ajax-loader.gif&quot;&gt;&nbsp;&lt;/span&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;bn-promise-hide=&quot;loading&quot;&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All&nbsp;the&nbsp;content&nbsp;loaded.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;style=&quot;width:680px;&quot;&nbsp;bn-promise-show=&quot;success&quot;&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img&nbsp;src=&quot;assets/01.jpg&quot;&nbsp;bn-promise&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img&nbsp;src=&quot;assets/02.jpg&quot;&nbsp;bn-promise&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img&nbsp;src=&quot;assets/03.jpg&quot;&nbsp;bn-promise&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img&nbsp;src=&quot;assets/04.jpg&quot;&nbsp;bn-promise&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/><br/>&lt;/body&gt;<br/><br/>&lt;/html&gt;<br/>
[Demonstration](https://dl.dropboxusercontent.com/u/2152786/public/angular-loading-promise/demo1.html)

**bn-promise** is a directive used to register a resouce to be tracked. 

**bn-promise-show** and **bn-promise-hide** is a directive to show or hide a portion of the DOM tree (HTML) according to the condition loading.

Possible values

 * "loading" - Resource is still loading
 * "done" - The loading is completed regardless of result
 * "success" - The loading is completed without error
 * "error" - The loading is completed with error

Installation
------------

To use Angular Loading Promise in your project , just copy the src/bnloadingpromise.js to your project tree and include it will work. The code has been proven to work after uglify.

Testing Environment
-------------------

If you want to test the loading behaviour deeply , you may use the example node.js server embedded in the code. This server will add a random delay of response for image file from 5 to 10s. 

Prerequisite

 * Node.js and NPM installed

Installation

	npm install
	node scripts/server.js

Then open this link in your browser

http://localhost:8000/tests/index.html

Advanced Topic
===============

Progress tracking
-----------------

See demo1 in tests/ folder


