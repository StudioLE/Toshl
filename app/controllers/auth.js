'use strict';

angular.module('app.auth', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'views/auth.html',
    controller: 'AuthCtrl'
  });
}])

/*****************************************************************
*
* AuthCtrl controlller
*
******************************************************************/
.controller('AuthCtrl', function($scope, $location, $http, Config, OAuth) {

  console.log($location.search())

  if($location.search().access_token) {
    // // Request an access token
    // $http.post(Config.token_url, {
    //   code: $location.search().code,
    //   grant_type: 'authorization_code'
    // }).success(function(data, status, headers, config) {
    //   console.error('Success!')
    //   console.error(data)
    // }).error(function(data, status, headers, config) {
    //   console.error('Something went wrong')
    //   console.error(data)
    // })
  }
  else {
    console.error('No access token received')
  }

});
