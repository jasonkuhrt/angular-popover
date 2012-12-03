var app = angular.module('app', ['popover', 'ngSanitize']);


app.controller('book', function($scope, $timeout) {
  $scope.bookTitle      = 'The Origin of species';
  $scope.chapterTitle   = 'Introduction';
  $scope.petTypes       = ['Cat', 'Bird', 'Dog', 'Snake']
  $scope.popoverTitle   = "<h1>About the boat</h1>"
  $scope.popoverContent = "<p>popover content</p>"



  //
  // Mock async data changes
  //

  $timeout(function(){
    console.log('timeout function fire! popover content')
    $scope.popoverContent = '<ul><li ng-repeat="petType in petTypes">{{petType}}</li></ul>'
  }, 1000)

  $timeout(function(){
    console.log('timeout function fire! popover title')
    $scope.popoverTitle = "<h3>About the H.M.S. Beagle</h3>"
  }, 2000)
});
