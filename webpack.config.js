const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const envFile = require('node-env-file');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (e) {

}


module.exports = {
    entry: './app/app.jsx',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'

    },
    resolve:{
        modules: [__dirname, 'node_modules', './app/components', './app/api' ],
        alias: {
          firebaseConf: 'app/firebase/index.js',
          actions: 'app/actions/actions.jsx',
          reducers: 'app/reducers/reducers.jsx',
          configureStore: 'app/store/configureStore.jsx'
        },
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {loader:'babel-loader', options:{presets:['react', 'es2015', 'stage-0'] } }

            },
            {
                test:/\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?&name=fonts/[name].[ext]'
            },
            {
                 test: /\.(ttf|eot|png)$/,
                 loader: 'file-loader?name=fonts/[name].[ext]'
            }
               ]
    },
    plugins: [
        extractPlugin,   
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
        GITGUN_ACCESS_TOKEN: JSON.stringify(process.env.GITGUN_ACCESS_TOKEN)

      }
    })
    ],
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'

}
