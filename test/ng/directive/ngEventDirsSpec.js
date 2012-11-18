'use strict';

describe('event directives', function() {
  var element;


  afterEach(function() {
    dealoc(element);
  });

  describe('blur/focus directives', function() {
    it('should get called on a blur/focus events', inject(function($rootScope, $compile) {
      var link = $compile('<div ng-blur="focusState = false" ng-focus="focusState = true"></div>');
      element = link($rootScope);
      $rootScope.$digest();
      expect($rootScope.focusState).toBeFalsy();

      browserTrigger(element, 'focus');
      expect($rootScope.focusState).toEqual(true);
      browserTrigger(element, 'blur');
      expect($rootScope.focusState).toEqual(false);
    }));
  });

  describe('ngSubmit', function() {

    it('should get called on form submit', inject(function($rootScope, $compile) {
      element = $compile('<form action="" ng-submit="submitted = true">' +
        '<input type="submit"/>' +
        '</form>')($rootScope);
      $rootScope.$digest();
      expect($rootScope.submitted).not.toBeDefined();

      browserTrigger(element.children()[0]);
      expect($rootScope.submitted).toEqual(true);
    }));
  });
});
