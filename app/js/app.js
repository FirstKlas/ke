'use strict';

/* App Module */

angular.module('myApp', ['firebase']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ekonomi', {templateUrl: 'partials/ekonomi.html', controller: ekonomiCtrl}).
      otherwise({redirectTo: '/ekonomi'});
}]);
