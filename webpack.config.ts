import * as slsw from "serverless-webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import {environment} from "./environment";
module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: {
                    failOnHint: true
                }
            },
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loader: "transform-loader/cacheable?brfs",
                enforce: "post"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: environment.eccodesDistFolderPath, to: `${environment.eccodesFolder}/dist` }
        ])
    ],
    externals: [
        /aws-sdk/
    ],
    devtool: "source-map",
    mode: "production"
};
