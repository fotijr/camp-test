// if not running in travis env, set to empty string to avoid not defined error
var travisJob = (typeof TRAVIS_JOB_NUMBER !== "undefined") ? TRAVIS_JOB_NUMBER : "";

module.exports = {
  "src_folders": [
    "integration"
  ],
  "output_folder": "reports",
  "custom_commands_path": "",
  "custom_assertions_path": "",
  "page_objects_path": "",
  "globals_path": "integration/nightwatch-globals.js",
  "selenium": {
    "start_process": false
  },
  "test_settings": {
    "default": {
      "exclude": "*nightwatch-globals.js",
      "selenium_port": 9515,
      "selenium_host": "localhost",
      "default_path_prefix": "",
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": ["--no-sandbox"]
        },
        "acceptSslCerts": true
      }
    },
    "ci": {
      "launch_url": "http://ondemand.saucelabs.com:80",
      "desiredCapabilities": {
        "build": `build-${travisJob}`,
        "tunnel-identifier": travisJob,
      }
    },
    "localToSauce": {
      "launch_url": "http://localhost",
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com",
      "username": "FotiJr",
      "access_key": "7f2e3b7f-d3ef-4e7d-88e8-369e306d3e07",
      "desiredCapabilities": {
          "javascriptEnabled": true,
          "browserName": "chrome"
      }
    }
  }
};