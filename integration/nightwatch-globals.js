var chromedriver = require('chromedriver');
const sauceLabReporter = require('./sauce-lab-reporter');

module.exports = {
  before: function (done) {
    chromedriver.start();
    done();
  },

  after: function (done) {
    chromedriver.stop();
    done();
  },

  tearDown: sauceLabReporter
};  