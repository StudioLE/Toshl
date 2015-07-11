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
  'xeditable',
  'ngCookies',
  'angular-oauth2',
  'app.config',
  'app.dashboard',
  'app.pages',
  'app.submit',
  'app.auth',
  'app.userFactory',
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


/*****************************************************************
*
* HTTP interceptor
*
******************************************************************/
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $location, localStorageService, Config) {
    return {
      request: function(req) {
        // If the request is to the app server
        // Add the JSON Web Token as a param
        if(_.contains(req.url, Config.endpoint_url)) {
          req.params = req.params || {};

          console.log(localStorageService.get('user'))
          // req.headers = req.headers || {};
          if(localStorageService.get('user')) {
            // req.params.access_token = localStorageService.get('user').access_token
            req.headers.Authorization = 'Bearer ' + localStorageService.get('user').access_token
          }
        }
        return req
      }
    }
  })
})


/*****************************************************************
*
* Content-Type: x-www-form-urlencoded
* http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
*
******************************************************************/
.config(function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
      
      if(name == '$$hashKey') {
        // Skip the $$hashkey that's added by Angular
      }
      else if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})
