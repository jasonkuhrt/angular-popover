var app = angular.module('app', ['popover', 'ngSanitize']);


app.controller('book', function($scope, $timeout) {
  $scope.bookTitle      = 'The Origin of species';
  $scope.chapterTitle   = 'Introduction';
  $scope.petTypes       = ['Cat', 'Bird', 'Dog', 'Snake']
  $scope.popoverTitle   = "<h1>About the boat</h1>"
  $scope.popoverContent = '<ul><li ng-repeat="petType in petTypes">{{petType}}</li></ul>'



  //
  // Mock async data changes
  //

  $timeout(function(){
    $scope.petTypes = ['ore', 'rutter', 'cannon', 'sail']
  }, 1000)

  $timeout(function(){
    $scope.popoverTitle = "<h3>About the H.M.S. Beagle</h3>"
  }, 2000)

});
