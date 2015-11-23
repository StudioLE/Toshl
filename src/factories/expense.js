'use strict'

angular.module('app.expenseFactory', [])

/*****************************************************************
*
* Expense factory
*
******************************************************************/
.factory('Expense', function($resource, Config) {
  return $resource(Config.endpoint('/expenses/:id'), {}, {
    edit: { method: 'PUT', params: {id: '@id'} }
  })
})
