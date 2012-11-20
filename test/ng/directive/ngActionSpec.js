describe('action directive', function() {
  var element;

  afterEach(function() {
    dealoc(element);
  });

  it('should call the right callback and pass the event object',
      inject(function($rootScope, $compile) {
    $rootScope.testFn = function(event) {
      expect(event).not.toBeDefined(); 
    }
    element = $compile(
      '<div ng-action="{click:\'testFn();count = count + 1\'}"></div>')
      ($rootScope);
    $rootScope.$digest();

    browserTrigger(element, 'click');
    expect($rootScope.count).toBe(1);
  }));
});
