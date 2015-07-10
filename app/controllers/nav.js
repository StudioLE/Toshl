angular.module('navList', [])

.controller('navCtrl', function($scope, $location, Data) {
  $scope.navClass = function(href) {
    return href === '#' + $location.path() ? 'active' : '';
  };

  $scope.nav = [{
    url: '#/import',
    title: 'Import'
  }, {
    url: '#/raw',
    title: 'Raw'
  }, {
    url: '#/process',
    title: 'Process'
  }, {
    url: '#/submit',
    title: 'Submit'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }

  $scope.clearData = function() {
    $location.path('/import')
    return Data.unset()
  }

  $scope.dataIsSet = function() {
    return Data.isset()
  }
  
});
