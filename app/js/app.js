'use strict';

/* App Module */
angular.module('myApp.controllers', []);

angular.module('myApp', ['myApp.controllers', 'firebase']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/ekonomi', {templateUrl: 'partials/ekonomi.html', controller: 'ekonomiRapportCtrl'}).
            when('/arkiv', {templateUrl: 'partials/arkiv.html', controller: 'arkivCtrl'}).
            when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'}).
            otherwise({redirectTo: '/login'});
    }]);
