const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: "./src/App.tsx",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  target: ["web", "es5"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("thread-loader"),
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
              cacheCompression: false,
              presets: [
                [
                  require.resolve("@babel/preset-env"),
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    modules: false,
                  },
                ],
                require.resolve("@babel/preset-react"),
                require.resolve("@babel/preset-typescript"),
              ],
              plugins: [
                process.env.NODE_ENV === "development" &&
                  require.resolve("react-refresh/babel"),
                [
                  require.resolve("@babel/plugin-proposal-class-properties"),
                  { loose: false },
                ],
                require.resolve("@babel/plugin-proposal-object-rest-spread"),
                require.resolve("@babel/plugin-proposal-optional-chaining"),
                require.resolve("babel-plugin-transform-require-default"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : require.resolve("style-loader"),
          require.resolve("css-loader"),
          require.resolve("less-loader"),
        ],
      },
    ],
  },
  plugins: [
    process.env.NODE_ENV === "development" && new ReactRefreshWebpackPlugin(),
    process.env.NODE_ENV === "production" &&
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].chunk.css",
      }),
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ["main"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        constvendors: {
          name: "constvendors",
          test: /[\\/]node_modules([\\/]react|[\\/]react-dom|[\\/]react-router|[\\/]react-router-dom|[\\/]redux|[\\/]redux-thunk|[\\/]react-redux|[\\/]react-router-redux|[\\/]lodash|[\\/]core-js|[\\/]axios|[\\/]babel-polyfill)[\\/]/,
          priority: 10,
        },
        LibA: {
          name: "LibA",
          test: /LibA/,
          priority: 0,
          enforce: true,
        },
        LibB: {
          name: "LibB",
          test: /LibB/,
          priority: 0,
          enforce: true,
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        common: {
          chunks: "async",
          name: "common",
          priority: -20,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    port: 8080,
    host: "0.0.0.0",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
