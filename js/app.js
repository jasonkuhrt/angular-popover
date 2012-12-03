var app = angular.module('app', ['popover', 'ngSanitize']);


app.controller('book', function($scope, $timeout) {
  $scope.bookTitle      = 'The Origin of species';
  $scope.chapterTitle   = 'Introduction';
  $scope.chapterBody    = "<p>When on <a popover data-html='<h1>boom</h1>'>board H.M.S. Beagle</a>, as naturalist, I was much struck with certain facts in the distribution of the inhabitants of South America, and in the geological relations of the present to the past inhabitants of that continent. These facts seemed to me to throw some light on the origin of species -- that mystery of mysteries, as it has been called by one of our greatest philosophers. On my return home, it occurred to me, in 1837, that something might perhaps be made out on this question by patiently accumulating and reflecting on all sorts of facts which could possibly have any bearing on it. After five years' work I allowed myself to speculate on the subject, and drew up some short notes; these I enlarged in 1844 into a sketch of the conclusions, which then seemed to me probable: from that period to the present day I have steadily pursued the same object. I hope that I may be excused for entering on these personal details, as I give them to show that I have not been hasty in coming to a decision.</p>";
  $scope.petTypes       = ['Cat', 'Bird', 'Dog', 'Snake']
  $scope.popoverTitle   = "<h1>popover title</h1>"
  $scope.popoverContent = "<p>popover content</p>"



  //
  // Fake async data changes
  //

  $timeout(function(){
    console.log('timeout function fire!')
    $scope.popoverTitle = "<h3>Updated popover title</h3>"
  }, 2000)

  $timeout(function(){
    console.log('timeout function fire!')
    $scope.popoverContent = '<ul><li ng-repeat="petType in petTypes">{{petType}}</li></ul>'
  }, 1000)

});
