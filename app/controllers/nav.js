angular.module('navList', [])

.controller('navCtrl', function($scope, $location) {
  $scope.navClass = function(href) {
    return href === '#' + $location.path() ? 'active' : '';
  };

  $scope.nav = [{
    url: '#/about',
    title: 'About'
  }, {
    url: '#/contact',
    title: 'Contact'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }
  
});
