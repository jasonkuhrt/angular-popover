var app = angular.module('app', ['popover', 'ngSanitize']);


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
  // Mock async data changes
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
