'use strict';

describe('event directives', function() {
  var element;


  afterEach(function() {
    dealoc(element);
  });

  it('ng-keydown should get called on a keydown', inject(function($rootScope, $compile) {
    element = $compile('<div ng-keydown="keydown = true"></div>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.keydown).toBeFalsy();

    browserTriggerKeyEvent(element, 'keydown');
    expect($rootScope.keydown).toEqual(true);
  }));

  it('ng-keydown should pass event object', inject(function($rootScope, $compile) {
    element = $compile('<div ng-keydown="event = $event"></div>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.event).toBeFalsy();

    browserTriggerKeyEvent(element, 'keydown');
    expect($rootScope.event).toBeDefined();
  }));


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
