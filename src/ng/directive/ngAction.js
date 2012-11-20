/**
 * @ngdoc directive
 * @name ng.directive:ngAction
 *
 * @description
 * The `ngAction` directive allows you to bind expressions to a given set of
 * browser events.
 *
 * @element ANY
 * @param {Object.<string, expression>} ngAction an object literal with event
 * names as key and {@link guide/expression Expressions} as values.
 * The expersions will be bound to the corresponding events using
 * jqlite/jQuery's bind.
 *
 * @example
   <doc:example>
     <doc:scenario>
     <button ng-action="
        {'click': 'clicks = clicks + 1',
        'mouseover': 'mouseovers = mouseovers + 1'}
        "> my text </button>
      <div>Clicks: {{clicks}}</div>
      <div>Mouseovers: {{mouseovers}}</div>
     </doc:source>
     <doc:scenario>
       it('should check ng-action', function() {
         element('.doc-example-live :button').hover();
         expect(binding('mouseovers')).toBe('1');
         element('.doc-example-live :button').click();
         expect(binding('clicks')).toBe('1');
       });
     </doc:scenario>
   </doc:example>
 */

var ngActionDirective = ['$parse', function($parse) {
  return function(scope, element, attr) {
    var actions = scope.$eval(attr['ngAction']);
    forEach(actions, function(expression, eventName) {
      var fn = $parse(expression);
      element.bind(eventName, function(event) {
        scope.$apply(function() {
          fn(scope, {$event: event});
        });
      });
    });
  };
}];
