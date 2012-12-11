


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
