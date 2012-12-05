describe('popover', function() {



  var scope, popoverEl;

  // load the popover code
  beforeEach(module('popover'));

  beforeEach(inject(function($rootScope, $compile) {
    var scenarioString =
      '<p popover="popoverConfig">' +
        'test'+
      '</p>';
    var scenarioElement = angular.element(scenarioString);
    scope = $rootScope;

    $compile(scenarioElement)(scope);
    scope.$digest();

    popoverEl = scenarioElement.data('popover').tip()
  }));



  it('should support string literals', inject(function($compile, $rootScope){
    scope.popoverConfig = {title:'test-title', content:'test-content'};
    scope.$digest();
    expect(popoverEl.find(".popover-title").text()).toBe('test-title');
    expect(popoverEl.find(".popover-content").text()).toBe('test-content');
  }));

  it('should support scope variables within the title or content templates', inject(function($compile, $rootScope, $timeout){
    scope.animal        = 'cow';
    scope.animalSound   = 'moo';
    scope.topic         = 'The sounds of animals'
    scope.popoverConfig = {
      content: '<div>The sound of a {{animal}}: {{animalSound}}</div>',
      title:   '<pre>{{topic}}</pre>',
      html:    true
    };
    scope.$digest();

    expect(popoverEl.find(".popover-content").text()).toBe('The sound of a cow: moo');
    expect(popoverEl.find(".popover-title").text()).toBe('The sounds of animals');

    /*

    TODO I have to read up on how to do or mock async testing in Jasmine and/or anguarljs

    $timeout(function(){
      scope.animal = 'crow';
      scope.$digest();
      expect(popoverEl.find(".popover-content").text()).toBe('the sound of a crow: moo')
    }, 1000);

    $timeout(function(){
      scope.animalSound = 'caw';
      scope.$digest();
      expect(popoverEl.find(".popover-content").text()).toBe('the sound of a crow: caw2')
    }, 2000)
    */
  }));
});
