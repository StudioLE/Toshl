'use strict';

angular.module('app.dashboard', ['ngRoute'])


/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/import', {
    templateUrl: 'views/import.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/raw', {
    templateUrl: 'views/raw.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/process', {
    templateUrl: 'views/process.html',
    controller: 'DashboardCtrl'
  });
}])

/*****************************************************************
*
* DashboardCtrl controlller
*
******************************************************************/
.controller('DashboardCtrl', function($scope, $location, Data, Parse) {

  /**
   * Get data from local storage
   */
  var data = Data.get()
  $scope.data = function() {
    return data
  }

  /**
   * Send the current data to console
   */
  $scope.checkData = function() {
    console.log($scope.data())
  }

  /**
   * Update data model
   *
   * Called when a x-editable is saved
   */
  $scope.updateData = function() {
    Data.set($scope.data())
  }

  /**
   * Remove row
   *
   * Called when a x-editable is saved
   */
  $scope.removeRow = function(row) {
    // Toggle remove
    row.removed = ! row.removed
    Data.set($scope.data())
  }
  

  /**
   * Import & parse CSV file
   *
   * Called when the file selection changes
   */
  $scope.importData = function() {

    // define reader
    var reader = new FileReader();

    // A handler for the load event (just defining it, not executing it right now)
    reader.onload = function(e) {
      // Parse CSV file
      var results = Papa.parse(reader.result, {
        header: true,
        skipEmptyLines: true
      })

      // results.expenses = []
      // results.income = []
      
      // Parse each row
      results.parsed = _.map(results.data, Parse)

      // Store data in Local Storage
      Data.set(results)
      console.debug(Data.get())

      // Redirect
      // $location.path('/parse')

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
