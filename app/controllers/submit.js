'use strict';

angular.module('app.submit', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/submit', {
    templateUrl: 'views/submit.html',
    controller: 'SubmitCtrl'
  });
}])

/*****************************************************************
*
* SubmitCtrl controlller
*
******************************************************************/
.controller('SubmitCtrl', function($scope, $location, Data) {

  /**
   * Sort data
   */
  var data = {
    expenses: [],
    incomes: []
  }
  _.each(Data.get().data, function(row) {
    if( ! row.removed) {
      // Divide the rows by type
      data[row.type + 's'].push(row.parsed)
    }
  })

  $scope.data = function() {
    return data
  }

  $scope.submit = function(type) {
    console.log('Submitting ' + type)
  }

});
