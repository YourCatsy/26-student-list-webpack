const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
      },
      mode: 'development',
      plugins: [
          new HtmlWebpackPlugin( {
        template: path.resolve(__dirname, 'src/index.html')
      })
    ],
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ],
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
      },
  };

  