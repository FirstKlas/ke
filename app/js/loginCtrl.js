angular.module('myApp.controllers').controller('loginCtrl', ['$scope', 'angularFireAuth', 'Firebase', function ($scope, angularFireAuth, Firebase) {
    var ref = new Firebase("https://ke.firebaseio.com/");
    angularFireAuth.initialize(ref, {scope: $scope, name: "user"});

    $scope.login = function() {
        angularFireAuth.login("facebook");
    };
    $scope.logout = function() {
        angularFireAuth.logout();
    };
}]);