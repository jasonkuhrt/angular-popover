var popover = angular.module('popover', []);

popover.directive('popover', function($compile, $timeout) {
  return {
    scope: true,
    link: function(scope, element, attrs) {

      $(element).popover()

      var popoverOptions      = $(element).data('popover').options
      var popoverContainerEls = {
        content: $(element).data('popover').tip().find('.popover-content'),
        title:   $(element).data('popover').tip().find('.popover-title')
      }



      //
      // Data binding on popover title and content
      //
      scope.$watch(attrs.title, function(newVal){
        refreshPopover('title', $compile(newVal)(scope))
      });


      scope.$watch(attrs.content, function(newVal){
        //refreshPopover('content', $compile(newVal)(scope))

        var compiledNewVal = $compile(newVal)(scope)
        //refreshPopover('content', $compile(newVal)(scope))
        console.log('new popover content value', compiledNewVal)
        $(element).data('popover').options.content = compiledNewVal
        $(element).data('popover').tip().find('.popover-content').html(compiledNewVal)
        //$(element).data('popover').tip().find('.popover-content').text('sdkfj')
      });



      function refreshPopover(popoverPart, newContent){
        // since we're interacting with the popover DOM directly, we have to honour
        // the html option manually
        var insertionMethod = popoverOptions.html ? 'html' : 'text'

        // make the content change display immediately
        popoverContainerEls[popoverPart][insertionMethod](newContent)

        // make the content change persist
        popoverOptions[popoverPart] = newContent;
      }


    } // link
  } // return literaly
});
