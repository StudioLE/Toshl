'use strict';

angular.module('app.config', [])

/*****************************************************************
*
* Configuration
*
******************************************************************/
.constant('Config', {
  client_id: '52ecf9d5-9f52-451d-b499-e916c27215e7ddada463b55bfe88ae0ffee8b7eaca42',
  // app_url: 'http://localhost:1337',
  oauth_url: 'https://toshl.com/oauth2/authorize',
  token_url: 'https://toshl.com/oauth2/token',
  endpoint_url: 'https://api.toshl.com',
  oauth: function() {
    return this.oauth_url + '?client_id=' + this.client_id + '&response_type=code&state=1234' //&redirect_uri=' + this.app_url + '/callback'
  },
  endpoint: function(req) {
    return this.endpoint_url + req
  }
})
