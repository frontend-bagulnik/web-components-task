const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app/index.js",
  output: {
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: "./public",
    port: 3000,
    hot: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: path.join(__dirname, "./node_modules"),
      },
    ],
  },
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
