var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app') + "/js/index.js";
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

//Setup staticlink with If condition. Leave blank for local. Notice the ending `/` url. Its important
var staticLink = ''

module.exports = {
    entry: APP_PATH,
    output: {
		/** 
		Paths:
		path: Defines the location to which webpack will write the files to. This is usually the `build` folder
		filename: Defines the name of the file the final bundle. You could use [name] to match the name of the entry JS
		publicPath: This is the static link to the CDN or in case of local "". Webpack will replace "../images/image.png" with "http://cdn.com/image.png"
		*/
        path: BUILD_PATH,
        filename: 'bundle.js',
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
		  ExtractTextPlugin: Processes all css'es into one file
		  HtmlWebpackPlugin: Processes HTML files (mostly index.html) and updates thier assets url (from the above).
							 If you have multiple index files sharing code, then just add another entry.
							 But it is advised to instead use multi-webpack configs. --> https://github.com/webpack/webpack/tree/master/examples/multi-compiler
		  */
	      new ExtractTextPlugin( "bundle.css" ),
		  new HtmlWebpackPlugin({template: 'app/index.html', hash: true}),
		  new HtmlWebpackPlugin({template: 'app/index_two.html', hash: true, filename: "index_two.html", favicon: "app/images/favicon.ico"})
	]
}