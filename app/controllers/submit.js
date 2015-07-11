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
.controller('SubmitCtrl', function($scope, $location, Data, Config, User, Income, Expense) {

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

  $scope.isAuthenticated = function() {
    return User.isset()
  }

  $scope.signIn = function() {
    window.location.href = Config.oauth()
  }

  $scope.submit = function() {
    console.log('Submitting...')

    // This is actually ridiculous
    // The Toshl API requires expenses to be submitted one by one
    // Hence the ridiculous each loop
    
    // Incomes
    _.each(data.incomes, function(item) {
      Income.save(item, function(value, response) {
        console.log('Income item saved')
        console.log(value)
      }, function(response) {
        console.log('failure')
        console.error(response)
      })
    })

    // Expenses
    _.each(data.expenses, function(item) {
      Expense.save(item, function(value, response) {
        console.log('Expense item saved')
        console.log(value)
      }, function(response) {
        console.log('failure')
        console.error(response)
      })
    })
  }

});
