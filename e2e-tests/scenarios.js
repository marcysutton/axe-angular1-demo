'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var AxeBuilder = require('axe-webdriverjs');

var ngA11yTestConfig = require('./ng-click.json');
var util = require('util');

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should render view1 when user navigates to homepage', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/My Favorite Muppets/);
    });

    it('should change Muppets', function() {
      element.all(by.css('[ng-click="selectMuppet(it)"]')).first().sendKeys(protractor.Key.ENTER);
      expect(element.all(by.css('#primary-col h2')).first().getText()).
        toMatch('Animal');
    });

    it('should have no accessibility violations', function(done) {
      AxeBuilder(browser)
        .analyze(function(results) {
          if (results.violations.length > 0) {
            console.log(util.inspect(results.violations, true));
          }
          else {
            console.log('No accessibility violations!');
          }
          expect(results.violations.length).toBe(0);
          done();
        });
    });
  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
