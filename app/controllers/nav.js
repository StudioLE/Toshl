angular.module('navList', [])

.controller('navCtrl', function($scope, $location, Data) {
  $scope.navClass = function(href) {
    return href === '#' + $location.path() ? 'active' : '';
  };

  $scope.nav = [{
    url: '#/upload',
    title: 'Upload'
  }, {
    url: '#/data',
    title: 'Raw'
  }, {
    url: '#/parse',
    title: 'Process'
  }, {
    url: '#/submit',
    title: 'Submit'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }

  $scope.clearData = function() {
    $location.path('/upload')
    return Data.unset()
  }

  $scope.dataIsSet = function() {
    return Data.isset()
  }
  
});
