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

'''

<html ng-app="bn.loadingPromise">
<head>
    <title>Demo1 - Use it without coding</title>
</head>
<script src="lib/angular.js"></script>
<script src="../src/bnloadingpromise.js"></script>

<body>
    <div bn-promise-show="loading">
        Loading <span bn-promise-show="loading"><img src="assets/ajax-loader.gif"> </span>
    </div>
    
    <div bn-promise-hide="loading">
        All the content loaded.
    </div>
    
    <div style="width:680px;" bn-promise-show="success">
        <img src="assets/01.jpg" bn-promise>
        <img src="assets/02.jpg" bn-promise>
        <img src="assets/03.jpg" bn-promise>
        <img src="assets/04.jpg" bn-promise>
    </div>

</body>

</html>

'''

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

