'use strict';

/*****************************************************************
*
* Declare app level module which depends on views, and components
*
******************************************************************/
angular.module('app', [
  'ngRoute',
  'ngResource',
  'LocalStorageModule',
  'navList',
  // 'ngFileUpload',
  'xeditable',
  'ngCookies',
  'angular-oauth2',
  'app.config',
  'app.dashboard',
  'app.pages',
  'app.submit',
  'app.auth',
  'app.dataFactory',
  'app.parseFactory',
  'app.expenseFactory',
  'app.incomeFactory'
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
* OAuth provider
*
******************************************************************/
.config(['OAuthProvider', function(OAuthProvider) {
    OAuthProvider.configure({
      baseUrl: 'https://toshl.com', // /oauth2/authorize',
      clientId: '52ecf9d5-9f52-451d-b499-e916c27215e7ddada463b55bfe88ae0ffee8b7eaca42',
      clientSecret: 'CLIENT_SECRET' // optional
    });
  }])

.run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return OAuth.getRefreshToken();
      }

      // Redirect to `/login` with the `error_reason`.
      return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
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
