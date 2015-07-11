angular.module('navList', [])

.controller('navCtrl', function($scope, $location, Data, User, Config) {
  $scope.navClass = function(href) {
    return href === '#' + $location.path() ? 'active' : '';
  };

  $scope.nav = [{
    url: '#/import',
    title: 'Import'
  }, {
    url: '#/review',
    title: 'Review'
  }, {
    url: '#/submit',
    title: 'Submit'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }

  $scope.clearData = function() {
    window.location.href = '/#/import'
    return Data.unset()
  }

  $scope.dataIsSet = function() {
    return Data.isset()
  }

  $scope.signIn = function() {
    window.location.href = Config.oauth()
  }

  $scope.signOut = function() {
    User.unset()
  }

  $scope.isAuthenticated = function() {
    return User.isset()
  }
  
});
