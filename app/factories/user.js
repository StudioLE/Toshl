'use strict'

angular.module('app.userFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('User', function(localStorageService, Config) {
  return {

    /**
     * User getter
     *
     * @return {Array} user
     */
    get: function() {
      return localStorageService.get('user')
    },

    /**
     * User setter
     *
     * @return {Array} user
     */
    set: function(user) {
      return localStorageService.set('user', user)
    },

    /**
     * User is set
     *
     * @return {Bool} user
     */
    isset: function() {
      if(localStorageService.get('user')) {
        return true
      }
      else {
        return false
      }
    },

    /**
     * User unset
     */
    unset: function() {
      return localStorageService.remove('user')
    }
  }
})
