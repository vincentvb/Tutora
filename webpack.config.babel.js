import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/index',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
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
      }
    ]
  }
};

export default config;

  // devServer: {
  //   contentBase: path.join(__dirname, 'public/dist'),
  //   publicPath: 'http://localhost:3000', 
  //   hot: true,
  //   historyApiFallback: {index: 'server/views/index.ejs'}
  // },