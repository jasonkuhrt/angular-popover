chai.should()

describe('popover', function() {
  // variables accessible in each test
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

    // create a reference to the popover DOM that we want to test
    popoverEl = scenarioElement.data('popover').tip();
  }));



  it('should support string literals', function(){
    scope.$apply(function(){
      scope.popoverConfig = {title:'test-title', content:'test-content'};
    });
    popoverEl.find(".popover-title").text().should.equal('test-title');
    popoverEl.find(".popover-content").text().should.equal('test-content');
  });



  it('should support *bound* scope variables', function(done){
    scope.$apply(function(){
      scope.animal        = 'cow';
      scope.animalSound   = 'moo';
      scope.topic         = 'The sounds of animals';
      scope.popoverConfig = {
        content: '<div>The sound of a {{animal}}: {{animalSound}}</div>',
        title:   '<pre>{{topic}}</pre>',
        html:    true
      };
    });

    popoverEl.find(".popover-content").text().should.equal('The sound of a cow: moo');
    popoverEl.find(".popover-title").text().should.equal('The sounds of animals');

    setTimeout(function(){
      scope.$apply(function(){
        scope.animal = 'crow';
        scope.topic  = 'The sounds of life';
      });
      popoverEl.find(".popover-content").text().should.equal('The sound of a crow: moo');
      popoverEl.find(".popover-title").text().should.equal('The sounds of life');
    }, 100);

    setTimeout(function(){
      scope.$apply(function(){
        scope.animalSound = 'caw';
        scope.topic       = 'The sounds of creatures';
      });
      popoverEl.find(".popover-content").text().should.equal('The sound of a crow: caw');
      popoverEl.find(".popover-title").text().should.equal('The sounds of creatures');
      done();
    }, 200);
  });



  it('should update itself if the html option changes', function(done){
    scope.$apply(function(){
      scope.popoverConfig = {
        title: "<p>test-title</p>",
        html: false
      }
    })
    popoverEl.find(".popover-title").text().should.equal('<p>test-title</p>');
    setTimeout(function(){
      scope.$apply(function(){
        scope.popoverConfig.html = true;
      });
      popoverEl.find(".popover-title").text().should.equal('test-title');
      done()
    }, 100);
  });

});
