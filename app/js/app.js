'use strict';

/* App Module */
angular.module('myApp.controllers', []);

angular.module('myApp', ['myApp.controllers', 'firebase']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ekonomi', {templateUrl: 'partials/ekonomi.html', controller: 'ekonomiRapportCtrl'}).
      when('/arkiv', {templateUrl: 'partials/arkiv.html', controller: 'arkivCtrl'}).
      otherwise({redirectTo: '/ekonomi'});
}]);
