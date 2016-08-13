# Bare minimum example of using webpack

A quick example of using [webpack](http://webpack.github.io/) for setting up JS/CSS and associated assets like images/fonts etc. You can use this as a starter kit or as a reference.
It assumes you have general awareness of webpack and its purpose.

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
Build structure will **NOT** have the same folder structure as `app`. In fact it will have all files at its root. e.g.
```
build
	|-- image1.png
		image2.png
		...
		imageN.png
		bundle.css
		bundle.js
		index.html
		index_N.html
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
Index html (or endpoint HTMLs) can be managed by Webpack as well. [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) is a very popular plugin that manages assets for HTML. Few rules to follow,

* Do not include the css or js bundles. Webpack will inject it correctly (i.e. CSS in head and JS at the end of body)
* For images, use relative path i.e. `./images/<image.png>`
* For multiple index files, repeat the html-webpack plugin. See the example in `webpack.config.js`
* You can add multiple entry points targeted for multiple index files. For e.g. `index_1.html` depends only on `index_1.js`, `index_2.html` on `index_2.js` and so on. See the example in `webpack.config.js`

**DO NOT PROCESS YOUR HTML BY GULP**, unless there is very specific case to do so.

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
<img src="../images/something.png"> # will replaced with --
														  |
														  v
<img src="http:/some-cdn.com/<theme>/something.png"> # notice that webpack replaced directly to the root of the URL
```
You can then upload the entire `build` as is to `http:/some-cdn.com/<theme>/`

####Closing remarks
The code example does not cover advanced features like code splitting, optimizations, custom plugins. Please visit [webpack docs](http://webpack.github.io/docs/).
Feel free to send a pull-request or watch for repo updates.



