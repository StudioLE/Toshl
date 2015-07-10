'use strict';

angular.module('app.dashboard', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {
    templateUrl: 'views/upload.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/data', {
    templateUrl: 'views/data.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/parse', {
    templateUrl: 'views/parse.html',
    controller: 'DashboardCtrl'
  });
}])

/*****************************************************************
*
* DashboardCtrl controlller
*
******************************************************************/
.controller('DashboardCtrl', function($scope, $location, Data, Parse) {

  var data = Data.get()
  
  $scope.data = function() {
    return data
  }

  $scope.errors = []

  $scope.fileChanged = function() {

    // define reader
    var reader = new FileReader();

    // A handler for the load event (just defining it, not executing it right now)
    reader.onload = function(e) {
      // Parse CSV file
      var results = Papa.parse(reader.result, {
        header: true
      })

      // results.expenses = []
      // results.income = []
      
      // Parse each row
      results.parsed = _.map(results.data, Parse)

      // Store data in Local Storage
      Data.set(results)
      console.debug(Data.get())

      // Redirect
      $location.path('/parse')

      // $scope.$apply(function() {
      //     $scope.raw = reader.result;
      //     $scope.results = results
      // });
    };

    // get <input> element and the selected file 
    var csvFileInput = document.getElementById('csvFile');    
    var csvFile = csvFileInput.files[0];

    // use reader to read the selected file
    // when read operation is successfully finished the load event is triggered
    // and handled by our reader.onload function
    reader.readAsText(csvFile);
    console.debug(csvFile)
  };

});
