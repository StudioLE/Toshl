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
.controller('SubmitCtrl', function($scope, $location, Data, Config, OAuth, Income, Expense) {

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

  $scope.oauth = function(type) {
    window.location.href = Config.oauth()
    console.log(OAuth.isAuthenticated())
  }

  $scope.submit = function(type) {
    console.log('Submitting ' + type)
    console.log(data[type])
    Income.save(data[type], function(value, response) {
      console.log('success')
      console.log(response)
    }, function(response) {
      console.log('failure')
      console.log(response)
    })
  }

});
