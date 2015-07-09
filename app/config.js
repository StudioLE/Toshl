'use strict';

angular.module('app.config', [])

/*****************************************************************
*
* Configuration
*
******************************************************************/
.constant('Config', {
  app_url: 'https://app.studiole.uk',
  app: function(req) {
    return this.app_url + req
  }
})
