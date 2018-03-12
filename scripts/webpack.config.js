const path = require('path');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../public')
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{
					from: /.*/,
					to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
				}
			]
		},
		hot: true,
		contentBase: config.dev.static, // since we use CopyWebpackPlugin.
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll
		}
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
		modules: ['../node_modules']
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: path.resolve(__dirname, '../src')
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'ts-loader' },

			{
				test: /\.((s*)css|sass)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				}),
				exclude: /node_modules/
			}

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			// { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},

	plugins: [
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			assets: {
				style: 'style.css'
			}
		}),
		new CopyWebpackPlugin([{ from: './src/app.css', to: '.' }])
	]

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	// externals: {
	// 	react: 'React',
	// 	'react-dom': 'ReactDOM',
	// 	'react-bootstrap': 'BT'
	// }
};
