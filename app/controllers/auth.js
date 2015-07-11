'use strict'

angular.module('app.auth', ['ngRoute'])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'views/import.html',
    controller: 'AuthCtrl'
  })
}])

/*****************************************************************
*
* AuthCtrl controlller
*
******************************************************************/
.controller('AuthCtrl', function($scope, $location, $http, Config, User) {

  if($location.search().access_token) {
    // Store the access_token and details
    User.set($location.search())
    $location.path('/review')
  }
  else {
    console.error('No access token received')
  }

})
