var $ = require("jquery");
var _ = require("underscore");
/*
Load all CSS. Webpack can process all CSS into one file
*/

require("../css/main.css");


/*
Your regular JS code
*/
var app = document.createElement('div');
app.innerHTML = '<h4>Hello World App from index_two.js with image below</h4>';
document.body.appendChild(app);

/* direct image injection */
var img = document.createElement('img');
img.src = require('../images/logo.png');
document.body.appendChild(img);

/* template injection that has image */
var sampleHtml = require("../templates/sample.html");
$(document).ready(function() {
	$("#template").append(_.template(sampleHtml)({}));
});
