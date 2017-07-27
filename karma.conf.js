const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/*.js': ["webpack", "coverage", "sourcemap"]
    },
    reporters: ["progress", "coverage", "kjhtml"],

    webpackMiddleware: {
      stats: {
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
      }
    },

    webpack: webpackConfig,

    coverageReporter: {
      reporters: [
        // generates ./coverage/lcov.info
        { type: 'lcovonly' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'IE', "Firefox"],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
