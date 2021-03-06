const webpackConfig = require("./webpack.config");
const ciBuild = (!!process.env.TRAVIS_BUILD_NUMBER);

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "dist/*.js",
      "test/spec/*.spec.js"
    ],
    exclude: [
    ],
    preprocessors: {
      "src/*.js": ["webpack", "sourcemap"],
      "test/**/*.spec.js": ["webpack", "sourcemap"]      
    },
    reporters: ciBuild ? ["dots", "coverage", "kjhtml"] : ["progress"],

    webpackMiddleware: {
        noInfo: true,
        colors: true,
        warnings: true,
        errors: true,
        chunkModules: false,
        timings: false,
        assets: false,
        version: false,
        hash: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errorDetails: false,
        publicPath: false
    },

    webpack: webpackConfig,

    coverageReporter: {
      reporters: [
        // generates ./coverage/lcov.info
        { type: "lcovonly" }
      ]
    },

    browserConsoleLogOptions: {
      terminal: false
    },

    client:{
      captureConsole: false
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ["Chrome", "IE", "Firefox"],
    browsers: ["Chrome"]    
  })
}
