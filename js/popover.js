var popover = angular.module('popover', []);

popover.directive('popover', function($compile) {
  return {
    link: function(scope, element, attrs) {
      $(element).popover();

      //
      // Data binding on popover title and content
      //

      attrs.$observe("title", function(newVal) {
        $(element).popover(refreshBootstrapPopover());
      });

      //scope.$watch(attrs.popoverContent, function(newContent) 
      attrs.$observe("content", function(newContent) {
        $(element).popover(refreshBootstrapPopover());
      });

      //
      // Integrate Bootstrap
      //

      function refreshBootstrapPopover(){
        // BS popoveres cannot be updated so we use brute force
        $(element).popover('destroy');
        return buildBootstrapPopoverConfigObject();
      }

      function buildBootstrapPopoverConfigObject(){
        // Because we use brute force on every BS popover update
        // we recreate the popover config object from scratch each time
        //
        // BS popover uses literal html-attributes if present over js config properties
        // This means we cannot use the BS popover attribute names because they will prevent the popover
        // from using the direcrtive's necessary processing of those attributes
        // that we want binding on
        //
        // while attributes that don't need angularjs processing could still use the native BS
        // attribute names, then we would create an inconsistent API (i.e. only some attributes need to be popover<name>)
        // and that seems to only add confusion, therefore we just force the popover prefix on every option
        //
        // options based on http://twitter.github.com/bootstrap/javascript.html#popovers
        return {
          animation:  scope.$eval(attrs.popoverAnimation)
          html:       scope.$eval(attrs.popoverHtml)
          placement:  scope.$eval(attrs.popoverHtml)
          title:      attrs.popoverTitle
          content:    $compile(attrs.popoverContent)(scope),
        };
      }
    }
  };
});
