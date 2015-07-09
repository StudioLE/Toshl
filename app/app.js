'use strict';

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'navList',
  'ngFileUpload',
  'app.config',
  'app.dashboard',
  'app.pages'
])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}])

/*****************************************************************
*
* Lodash
*
******************************************************************/
.constant('_', window._)
