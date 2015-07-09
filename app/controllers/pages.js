'use strict';

angular.module('app.pages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/pages/home.html',
    controller: 'PageCtrl'
  });
  $routeProvider.when('/about', {
    templateUrl: 'views/pages/about.html',
    controller: 'PageCtrl'
  });
  $routeProvider.when('/contact', {
    templateUrl: 'views/pages/contact.html',
    controller: 'PageCtrl'
  });
  $routeProvider.when('/404', {
    templateUrl: 'views/pages/404.html',
    controller: 'PageCtrl'
  });
}])

.controller('PageCtrl', function() {
});
