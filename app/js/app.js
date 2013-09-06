'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices', 'firebase']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      when('/ica', {templateUrl: 'partials/ica.html', controller: icaTestCtrl}).
      when('/addItems', {templateUrl: 'partials/addItems.html', controller: addItemCtrl}).
      when('/ekonomi', {templateUrl: 'partials/ekonomi.html', controller: ekonomiCtrl}).
      otherwise({redirectTo: '/phones'});
}]);
