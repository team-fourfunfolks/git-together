module.exports = {
	output:{
	  path: './build',
	  publicPath: './build',
	  filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|server.js)/,
				loader: 'babel',
				query: {
          presets: ['react', 'es2015']
        }
			},
			{
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader'
      }
		]
	}
};