const webpack = require('webpack');

module.exports = {
	entry: './src/charts.js',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					compact: false,
					presets: ['babel-preset-metal-jsx'],
					plugins: ['babel-plugin-transform-node-env-inline']
				}
			}
		}]
	},
	output: {
		library: 'metal',
		libraryTarget: 'this',
		filename: './build/globals/metal-charts.js'
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
