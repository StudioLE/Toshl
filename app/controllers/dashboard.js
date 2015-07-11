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
  $routeProvider.when('/review', {
    templateUrl: 'views/review.html',
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

      var data = {
        expenses: [],
        incomes: []
      }

      // Divide the rows by type
      _.each(results.data, function(item) {
        console.log(item)
        if( ! item.Amount) {
          console.log('Blank row')
        }
        else if(item.Amount.substr(0,1) == '-') {
          item.type = 'expense'
          data.expenses.push(item)
        }
        else {
          item.type = 'income'
          data.incomes.push(item)
        }
      })

      // Add to the local scope so the user gets immediate feedback
      $scope.$apply(function() {
          $scope.data = data
      });

      console.log(results)
      console.log(data)
      
      // Parse each expense
      console.log(_.map(data.expenses, Parse.expense))
      
      // Parse each income
      console.log(_.map(data.incomes, Parse.income))

      console.log(data)

      // Store data in Local Storage
      Data.set(data)

      // Redirect
      // $location.path('/review')
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
