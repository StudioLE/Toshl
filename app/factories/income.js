'use strict';

angular.module('app.incomeFactory', [])

/*****************************************************************
*
* Income factory
*
******************************************************************/
.factory('Income', function($resource, Config) {
  return $resource(Config.endpoint('/incomes/:id'), {}, {
    edit: { method: 'PUT', params: {id: '@id'} }
  })
})
