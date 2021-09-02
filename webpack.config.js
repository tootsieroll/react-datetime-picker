const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    bundle: __dirname + `/index.tsx`,
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  devServer: {
    publicPath: path.join(__dirname, '/'),
    contentBase: path.join(__dirname, '/'),
    port: 3000,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/react", "@babel/typescript"],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  externals: {
  }
}
