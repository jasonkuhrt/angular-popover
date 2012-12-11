var popover = angular.module('popover', []);



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
