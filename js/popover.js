var popover = angular.module('popover', []);

popover.directive('popover', function($compile) {
  return function(scope, element, attrs) {



    //
    // init
    //
    element.popover();
    prepPopoverDestruction();



    //
    // Data binding on the entire popover config
    //
    scope.$watch(attrs.popover, function(newOpts){
      if (newOpts) {
        // not the most effecient technique? if one option changes every single
        // option is considered changed (recalculated)
        for (var opt in newOpts) {
          if (
            (opt !== 'title' && opt !== 'content') ||   //  we don't need to compile non-content stuff
            !newOpts.html ||                            //  if html option is off, we don't need to compile content
            !$(newOpts[opt]).length) {                  //  if the content is plaintext we don't need to compile it
            var optValue = newOpts[opt];
          } else {
            var optValue = $compile(newOpts[opt])(scope);
          }
          element.data('popover').options[opt] = optValue;
        }
        element.popover('setContent');
      }
    // compare equality, not reference, thus allowing us to watch an object, array, etc.
    }, true);



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
