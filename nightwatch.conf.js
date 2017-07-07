module.exports = {
  'src_folders': [
    'integration'
  ],
  'output_folder': 'reports',
  'custom_commands_path': '',
  'custom_assertions_path': '',
  'page_objects_path': '',
  "globals_path": "integration/nightwatch-globals.js",
  'selenium': {
    'start_process': false
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
      "launch_url": 'http://ondemand.saucelabs.com:80',
      "desiredCapabilities": {
        "build": `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
      },
    }
  }
}