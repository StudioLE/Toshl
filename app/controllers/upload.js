'use strict';

angular.module('app.dashboard', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

/*****************************************************************
*
* DashboardCtrl controlller
*
******************************************************************/
.controller('DashboardCtrl', function($scope) {
  
  $scope.user = function() {
    // return User.get()
  }

  $scope.errors = []

  $scope.fileChanged = function() {

    console.log('triggered')

    // define reader
    var reader = new FileReader();

    // A handler for the load event (just defining it, not executing it right now)
    reader.onload = function(e) {
        $scope.$apply(function() {
            $scope.csvFile = reader.result;
        });
    };

    // get <input> element and the selected file 
    var csvFileInput = document.getElementById('csvfile');    
    var csvFile = csvFileInput.files[0];

    // use reader to read the selected file
    // when read operation is successfully finished the load event is triggered
    // and handled by our reader.onload function
    reader.readAsText(csvFile);
  };

});
