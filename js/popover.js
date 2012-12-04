var popover = angular.module('popover', []);

popover.directive('popover', function($compile) {
  return {
    scope: true,
    link: function(scope, element, attrs) {

      // init
      element.popover();

      //scope.confObject = scope.$eval(attrs.popover);
      //console.log(scope.confObject);



      //
      // Data binding on popover title and content attributes
      //
      scope.$watch(attrs.popoverTitle, function(newVal){
        if (newVal) {
          refreshPopover('title', newVal);
        }
      });

      scope.$watch(attrs.popoverContent, function(newVal){
        if (newVal) {
          refreshPopover('content', newVal);
        }
      });

      scope.$watch(attrs.popover, function(newVal){
        if (newVal) {
          for (p in newVal) {
            if (p == 'title' || p == 'content') {
              element.data('popover').options[p] = $compile(newVal[p])(scope)
            } else {
              element.data('popover').options[p] = newVal[p]
            }
          }
          element.popover('setContent')
        }
      }, true);


      //
      // popoverPart refers to either the 'title' or 'content'
      //
      function refreshPopover(popoverPart, newVal){
        // update options with new content
        element.data('popover').options[popoverPart] = $compile(newVal)(scope);
        // refresh the popover, which will use the newly changed options
        element.popover('setContent');
      }
    }
  }
});
