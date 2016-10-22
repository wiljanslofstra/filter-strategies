module.exports = function(config) {
  var customLaunchers = {};
  var reporters = ['dots'];
  var browsers = ['Chrome'];
  var singleRun = false;

  if (process.argv.indexOf('--sauce') >= 0) {
    var customLaunchers = {
      // sl_ios_safari: {
      //   base: "SauceLabs",
      //   browserName: "iPhone",
      //   platform: "OS X 10.10",
      //   version: "8.4"
      // },
      sl_ie_9: {
        base: "SauceLabs",
        browserName: "Internet Explorer",
        platform: "Windows 7",
        version: "9"
      },
      sl_ie_11: {
        base: "SauceLabs",
        browserName: "Internet Explorer",
        platform: "Windows 8.1",
        version: "11"
      },
      // 'sl_android_4.4': {
      //   base: "SauceLabs",
      //   browserName: "Android",
      //   platform: "Linux",
      //   version: "4.4"
      // },
      sl_chrome: {
        base: "SauceLabs",
        browserName: "Chrome",
        platform: "Windows 8.1"
      },
      sl_firefox: {
        base: "SauceLabs",
        browserName: "Firefox",
        platform: "Windows 8.1"
      },
    };

    reporters.push('saucelabs');

    browsers = Object.keys(customLaunchers);

    singleRun = true;
  }

  config.set({
    browsers: browsers,
    singleRun: singleRun,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    sauceLabs: {
      testName: 'Filter strategies unit testing'
    },
    reporters: reporters,
    customLaunchers: customLaunchers,
    browserNoActivityTimeout: 100000,
  });
};
