# Bare minimum example of using webpack

A quick example of using webpack for setting up JS/CSS and associated assets like images/fonts etc. It also shows how to setup CDN.
**Comments are welcome.**

## How to

### Folder structure

This is just a preference and no bearing on how webpack works. Desired folder structure

```
app 
  | 
  |-- css
      images
	  js
	  templates
	  index.html
  |-- package.json
  |-- tasks (i am using a fake-gulp.sh to mimic)
  |-- webpack.config.js
```

Running webpack will create a `build` folder.

### Build structure
Build structure will **NOT** have the folder structure as `app`. In fact it will have all files at its root. e.g.
```
build
	|-- image1.png
		image2.png
		...
		imageN.png
		bundle.css
		bundle.js
		index.html
		font1.__
````

### Paths
#### CSS
All images in `url(..)` should have path relative to the `app` folder, so `../images/<image file>`
e.g.
```
	.image-class {
		background-image: url("../images/logo--background.jpg");
	}
```

#### Templates
Templates are injected via JS. `<img ` tags in the html will follow the same pattern
e.g.
```
	<img src="../images/logo.png">
```

#### JS
All includes in JS should be relative to `app`, e.g.
```
var sampleHtml = require("../templates/sample.html");
img.src = require('../images/logo.png');
```

#### Index html
**Webpack will not handle these files. You would need the gulp task to replace the SRC**

* Include the webpacked files, namely `bundle.css`, `bundle.js` in `index.html` e.g.
```
<link rel="stylesheet" href="bundle.css" media="all"/>	
....
<script src="bundle.js"></script>
```
**DO NOT PUT FRONT SLASH, like `/bundle.js`** for webpack bundles

##### How-to replace
Since the names of the bundled webpack are known, simply do a direct replace via `sed` or if using `gulp`

```
.pipe(replace('src="bundle.js', static_link + "/bundle.js"))
.pipe(replace('src="bundle.css', static_link + "/bundle.css"))
```

* **Working on a better way to handle this.** There is a workaround to have the HTML as an entry point but its not straight forward. So meanwhile follow this pattern. 
* Also, there is no rule on what you want to name the bundles. We name them `main.js`, `scripts.js`. Feel free to do so, just make sure they match

#### CDN Setup
Webpack property `publicPath` when set, will prefix all asset links with the CDN URL
e.g. 

```
//You would check for environment variable here to see if its production etc
//Leave blank for local.
var staticLink = ''
if(env.PRODUCTION) {
	//Its important to put the ending slash. It will be apparent in the next section
	staticLink = 'http:/some-cdn.com/theme-name/assets/'
}

module.exports = {
	...
	...
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        publicPath: staticLink
    },

```
When loaded in the browser, all assets packed by webpack will have the prefix url e.g.
```
<img src="../images/something.png"> will be replaced with

# notice that webpack replaced directly to the root of the URL
<img src="http:/some-cdn.com/theme-name/assets/something.png"> 

```




