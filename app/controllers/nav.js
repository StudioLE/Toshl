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
    title: 'Data'
  }, {
    url: '#/raw',
    title: 'Raw'
  }, {
    url: '#/parse',
    title: 'Parse'
  }, {
    url: '#/submit',
    title: 'Submit'
  }]

  $scope.navView = function() {
    return 'views/nav.html'
  }

  $scope.clearData = function() {
    return Data.unset()
  }
  
});
