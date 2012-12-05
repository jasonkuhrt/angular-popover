describe('popover', function() {
  var elementString, element, scope;

  // load the popover code
  beforeEach(module('popover'));

  // load the templates
  //beforeEach(module('test/popover-scenario.html'));

  beforeEach(inject(function($rootScope, $compile) {
    elementString =
      '<p popover="{title:\'test-title\', content:\'test-content\'}">' +
        'test'+
      '</p>';
    element = angular.element(elementString);
    scope   = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should pass', inject(function($compile, $rootScope){
    dump(element);
    expect(true).toBe(true)
  }));

});
