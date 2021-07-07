const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    library: 'DateTimePicker',
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: '[name].js',
    globalObject: 'this',
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
    'react': 'react',
    'react-dom': 'react-dom',
  }
};
