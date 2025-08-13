const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/web-components-task/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: path.join(__dirname, "./node_modules"),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  resolve: {
    alias: {
      "@*": path.resolve(__dirname, "src/*"),
      "@app": path.resolve(__dirname, "src/app/*"),
      "@pages": path.resolve(__dirname, "src/pages/*"),
      "@widgets": path.resolve(__dirname, "src/widgets/*"),
      "@features": path.resolve(__dirname, "src/features/*"),
      "@shared": path.resolve(__dirname, "src/shared/*"),
    },
  },
};
