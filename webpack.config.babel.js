import webpack from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';

const config = {
  entry: './client/src/base',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      { test: /\.scss$/,
      use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
      },
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      },
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      }]
  }
};

if (process.env.DOCKER === 'isTrue') {
  config.plugins = [
      new Dotenv({
        path: './.env'
      })
    ];
}

export default config;

  // devServer: {
  //   contentBase: path.join(__dirname, 'public/dist'),
  //   publicPath: 'http://localhost:3000', 
  //   hot: true,
  //   historyApiFallback: {index: 'server/views/index.ejs'}
  // },