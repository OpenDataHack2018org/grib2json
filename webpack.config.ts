import * as slsw from "serverless-webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import {environment} from "./environment";
import * as WebpackOnBuildPlugin from "on-build-webpack";
import {chmodSync} from "fs";
function fixExecutablePermissions(stats) {
    for (const filename in stats.compilation.assets) {
        if (filename.endsWith("grib_dump")) {
            const basePath = stats.compilation.outputOptions.path;
            const fullPath = `${basePath}/${filename}`;
            chmodSync(fullPath, "755");
        }
    }
}
module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
        // We no not want to minimize our code.
        minimize: false
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
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: environment.eccodesDistFolderPath, to: `${environment.eccodesFolder}/dist`, copyPermissions: true }
        ]),
        new WebpackOnBuildPlugin(fixExecutablePermissions)
    ],
    externals: [
        /aws-sdk/
    ],
    devtool: "source-map"
};
