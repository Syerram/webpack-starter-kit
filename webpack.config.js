var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

//Setup staticlink with If condition. Leave blank for local. Notice the ending `/` url. Its important
var staticLink = ''

module.exports = {
	/**
	As the name mentions, entry point is list of files that webpack will process and bundle the dependencies.
	Each entry will produce a bundled JS with the name of the key. e.g. index: 'app/js/random.js` will produce `index.js` as bundled file.
	See `filename` property below, which should be set to `[name].js`
	Multiple entry points can be used for separating files (chunking) and only load that is needed.
	Chunking can be used in conjunction with HtmlWebpackPlugin to create entry html endpoints with their respective dependencies
	*/
    entry: {
		index: APP_PATH + "/js/index.js",
		index_two: APP_PATH + "/js/index_two.js",
		vendor: ["jquery", "underscore"]
	},
    output: {
		/** 
		Paths:
		path: Defines the location to which webpack will write the files to. This is usually the `build` folder
		filename: Defines the name of the file the final bundle. You could use [name] to match the name of the entry JS
		publicPath: This is the static link to the CDN or in case of local "". Webpack will replace "../images/image.png" with "http://cdn.com/image.png"
		*/
        path: BUILD_PATH,
        filename: '[name].js',
        publicPath: staticLink
    },
    module: {
        loaders: [
			/**
			Loaders:
			They process each type of file (matching regex)
			Images: url loader that processes by fetching the image (e.g. ../images/image.png), replacing it with just `image.png` and copying it to dest (usually `build`)
			Css: Processes CSS/in-line styles and all its dependencies. Just like images, it will lookup (../css/<>, and ../images/<>) and copy them to `build`
			Html: All templates that are required are loaded and all of its dependencies are processed the same as above
			*/
            {test: /\.(png|jpg)$/, loader: 'url?limit=10'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.html$/i, loader: "html"}
        ],
    },
	plugins: [ 
		  /**
		  Plugins process files after loaders. 
		  CommonsChunkPlugin: Separate out common chunks from the main script. For e.g. vendor is extracted into its own file instead of bundling it with bundle.js
		  ExtractTextPlugin: Processes all css'es into one file
		  HtmlWebpackPlugin: Processes HTML files (mostly index.html) and updates thier assets url (from the above).
							 If you have multiple index files sharing code, then just add another entry.
							 Handling direct relationships. Often times you might have multiple index files depending on specific JS bundles. 
							 In such cases, you can specify the chunk names as dependencies. In this example, `index.html` depends only on `index.js`, and `index_two.html` depends on `index_two.js`,
							 the `chunks` paramter is list that takes the `vendor` (common to both index files) and their respective dependency.
		  */
		  new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js", minChunks: Infinity}),
	      new ExtractTextPlugin( "main.css" ),
		  //Eg : Shows we are using two different templates with chunks pointing to their respective dependencies
		  new HtmlWebpackPlugin({template: 'app/index.html', hash: true, chunks: ['vendor', 'index']}), 
		  new HtmlWebpackPlugin({template: 'app/index_two.html', hash: true, filename: "index_two.html", chunks: ['vendor', 'index_two'], favicon: "app/images/favicon.ico"})
	]
}