'use strict';

angular.module('app.dataFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Data', function(localStorageService, Config) {
  var Data = {

    /**
     * User token getter
     *
     * @return {String} token
     */
    get: function() {
      return localStorageService.get('data')
    },

    /**
     * User token setter
     *
     * @return {String} token
     */
    set: function(data) {
      return localStorageService.set('data', data)
    },

    /**
     * User token unset
     */
    unset: function() {
      console.log('Data Unset')
      return localStorageService.remove('data')
    }
  }

  /**
   * Init 
   *
   * Check whether a JSON Web Token is present in local storage
   * if it is then fetch the user data from the server
   * otherwise just check the server is online
   *
   * @return {Object} user 
   */
  // var init = function() {
  //   // if(User.token.get()) {
  //   //   User.fetch()
  //   // } 
  //   // else {
  //   //   User.fetch('guest')
  //   // }
  //   return Data
  // }
  return Data
});
