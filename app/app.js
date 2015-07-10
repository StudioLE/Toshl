'use strict';

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'navList',
  'ngFileUpload',
  'xeditable',
  'app.config',
  'app.dashboard',
  'app.pages',
  'app.submit',
  'app.dataFactory',
  'app.parseFactory'
])

/*****************************************************************
*
* Route provider
*
******************************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}])

/*****************************************************************
*
* Lodash
*
******************************************************************/
.constant('_', window._)


/*****************************************************************
*
* Xeditable
*
******************************************************************/
.run(function(editableOptions, editableThemes) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
})
