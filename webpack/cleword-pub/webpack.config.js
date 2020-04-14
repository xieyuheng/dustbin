const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    "index": "./src/index.main.ts",
    "roadmap": "./src/roadmap/roadmap.main.ts",
    "storyteller": "./src/storyteller/storyteller.main.ts",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [ { test: /\.css$/, use: ["style-loader", "css-loader"] },
             { test: /\.ts?$/, use: ["ts-loader"], exclude: /node_modules/ } ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({ filename: "index.html",
                            template: "template/index.html",
                            chunks: ["index"] }),

    new HtmlWebpackPlugin({ filename: "design-style-guide.html",
                            template: "template/design-style-guide.html",
                            chunks: ["index"] }),

    new HtmlWebpackPlugin({ filename: "roadmap.html",
                            template: "template/roadmap.html",
                            chunks: ["roadmap"] }),

    new HtmlWebpackPlugin({ filename: "storyteller.html",
                            template: "template/storyteller.html",
                            chunks: ["storyteller"] }),
  ],
}
