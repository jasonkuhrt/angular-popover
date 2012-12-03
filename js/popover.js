var popover = angular.module('popover', []);

popover.directive('popover', function($compile) {
  return {
    link: function(scope, element, attrs) {
      $(element).popover();

      attrs.$observe("popoverTitle", function(newVal) {
        $(element).popover(refreshBootstrapPopover());
      });

      //scope.$watch(attrs.popoverContent, function(newContent) 
      attrs.$observe("popoverContent", function(newContent) {
        $(element).popover(refreshBootstrapPopover());
      });

      function refreshBootstrapPopover(){
        $(element).popover('destroy');
        return buildBootstrapPopoverConfigObject();
      }

      function buildBootstrapPopoverConfigObject(){
        return {
          title: attrs.popoverTitle,
          content: $compile(attrs.popoverContent)(scope),
          html: scope.$eval(attrs.popoverHtml),
          placement: attrs.popoverPlacement
        };
      }
    }
  };
});
