const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    library: 'GridTable',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: '[name].js'
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
          use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  }
};
