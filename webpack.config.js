const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
module.exports = (env) => {
  return {
    mode: env.mode || "development",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].bundle.js",
      publicPath: "/",
      clean: true, // Clean build folder before making new bundles
    },
    module: {
      /**
       * Array of rules:
       * Matches / handles requests when a modules is created when compiling
       * Rules can apply loaders to the modules or modify the parser
       */
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          /**
           * babel-loader
           * Input js / jsx files --> browser understandable file
           * Automatically picks up babel config files
           */
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Handles imports where extensions are not explicitly stated
    },
    plugins: [
      /**
       * HtmlWebpackPlugin links custom index.html to bundle.js
       * inserts the named build file in script tags automatically in index.html
       */
      new HtmlWebpackPlugin({
        title: "Custom template",
        // Load a custom template
        template: "./src/index.html",
      }),
    ],
    devServer: {
      historyApiFallback: true, // As this app is a SPA, we do not want the application to look for /* and instead for index.html
      static: {
        directory: path.join(__dirname, "build"),
      },
      compress: true,
      port: 9000,
    },
  };
};
