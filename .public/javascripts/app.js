(function(){var app = angular.module('app', ['popover', 'bindCompile', 'ngSanitize']);


app.controller('book', function($scope, $timeout) {
  $scope.bookTitle      = 'The Origin of species';
  $scope.chapterTitle   = 'Introduction';
  $scope.petTypes       = ['Cat', 'Bird', 'Dog', 'Snake']
  $scope.popoverTitle   = "<h1>About the boat</h1>"
  $scope.popoverContent = '<ul><li ng-repeat="petType in petTypes">{{petType}}</li></ul>'
  $scope.popoverConfig  = {
    title: $scope.popoverTitle,
    content: $scope.popoverContent,
    html: true
  }



  //
  // Demo async data changes
  //

  // change the content data
  $timeout(function(){
    $scope.petTypes = ['ore', 'rutter', 'cannon', 'sail']
  }, 1000)

  // change the title template
  $timeout(function(){
    $scope.popoverTitle = "<h3>About the H.M.S. Beagle{{optionalPunctuation}}</h3>"
    $scope.popoverConfig.title = $scope.popoverTitle
  }, 2000)

  // change the title data
  $timeout(function(){
    $scope.optionalPunctuation = " ?!!!?"
  }, 3000)

  // change the content template
  $timeout(function(){
    $scope.popoverContent = '<pre><ul><li ng-repeat="petType in petTypes">{{petType}}</li></ul></pre>'
    $scope.popoverConfig.content = $scope.popoverContent
  }, 4000)
});
})();(function(){


var bindCompile = angular.module('bindCompile', []);



bindCompile.directive('bindCompile', function($compile){
  return function(scope, element, attrs) {
    scope.$watch(attrs.bindCompile, function(newTemplateString){
      var compiledHTML = ($compile(newTemplateString)(scope));
      if (compiledHTML.length) {
        element.html(compiledHTML);
      } else {
        element.text(newTemplateString);
      }
    });
  }
});
})();(function(){var popover = angular.module('popover', []);



popover.directive('popover', function($compile, $http) {
  return function(scope, element, attrs) {



    //
    // init
    //
    element.popover();
    prepPopoverDestruction();

    // whitelist to sniff out options to specially handle
    var contentAttrs       = ['title', 'content', 'contentSrc', 'titleSrc'];
    var remoteContentAttrs = ['contentSrc', 'titleSrc'];



    //
    // Data binding on the entire popover config
    //
    scope.$watch(attrs.popover, function(newOpts){
      if (newOpts) {
        newOpts = _.defaults(newOpts, {html:true})
        // not the most effecient technique? if one option changes every single
        // option is considered changed (recalculated)
        for (var opt in newOpts) {
          if (_.contains(contentAttrs, opt)) {
            if (_.contains(remoteContentAttrs, opt)) {
              var remoteContentOpt = opt;
              $http.get(newOpts[opt]).then(function(res){
                updatePopoverOptions(normalizeOptName(remoteContentOpt), handleTemplate(res.data));
              })
            } else {
              updatePopoverOptions(normalizeOptName(opt), handleTemplate(newOpts[opt]));
            }
          } else {
            updatePopoverOptions(normalizeOptName(opt), newOpts[opt]);
          }
        }
      }
      function handleTemplate(templateString){
        return newOpts.html ? compileOrFallBack(templateString, scope) : templateString ;
      }
    // compare equality, not reference, thus allowing us to watch an object, array, etc.
    }, true);



    //
    //  Utility functions
    //

    function normalizeOptName(optName){
      if (_.contains(['titleSrc', 'contentSrc'], optName)) {
        return optName == 'titleSrc' ? 'title' : 'content' ;
      } else {
        return optName
      }
    }

    function compileOrFallBack(maybeHTMLString, scope){
      var compiledHTML = $compile(maybeHTMLString)(scope);
      return compiledHTML.length ? compiledHTML : maybeHTMLString ;
    }

    function updatePopoverOptions(optName, optValue) {
      element.data('popover').options[optName] = optValue;
      element.popover('setContent');
    }



    //
    //  BS creates popovers near the bottom of the DOM
    //  therefore if a popover is open in a destroyed scope (i.e. route change -> view change)
    //  its markup will stay stagnant in the page, and visually a popover will be hovering
    //  aimlessly on the page, unable to be closed by the user!
    //
    //  This function handles the above case
    //
    function prepPopoverDestruction() {
      // save a popover reference for teardown, element
      // isn't available after $destroy evidently?
      var popoverObject = element.data('popover');
      scope.$on("$destroy", function() {
        popoverObject.destroy();
      });
    }
  };
});
})();