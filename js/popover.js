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
        for (opt in newOpts) {
          if ((opt !== 'title' && opt !== 'content') || !newOpts.html) {
            var optValue = newOpts[opt];
          } else {
            var optValue = safeCompile({source:newOpts[opt], wrapperClass:'popover-'+opt, scope:scope});
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



    //
    //  Options
    //  source | scope | wrapper-class
    //
    function safeCompile(opts) {
      opts.wrapperClass = opts.wrapperClass || 'content'
      // wrapping is important because $compile will not work on plaintext, it needs a root-node
      wrappedSource = "<div class='"+opts.wrapperClass+"-wrapper'>"+opts.source+"</div>"
      return $compile(wrappedSource)(opts.scope)
    }
  };
});
