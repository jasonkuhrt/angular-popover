var popover = angular.module('popover', []);

popover.directive('popover', function($compile) {
  return function(scope, element, attrs) {



    // init
    element.popover();
    prepPopoverDestruction();



    //
    // Data binding on the entire popover config
    //
    scope.$watch(attrs.popover, function(newOpts){
      if (newOpts) {
        // not the most effecient technique? if one option changes every single
        // option is considered changed (recalculated)
        for (opt in newOpts) {
          var optValue = (opt == 'title' || opt == 'content') ? $compile(newOpts[opt])(scope) : newOpts[opt] ;
          element.data('popover').options[opt] = optValue;
        }
        element.popover('setContent');
      }
    }, true);



    //
    //  BS creates popovers near the bottom of the DOM
    //  therefore if a popover is open in a destroyed scope (i.e. route change -> view change)
    //  its markup will stay stagnant in the page
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
