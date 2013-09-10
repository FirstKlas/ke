angular.module('myApp.controllers').controller('mainCtrl', ['$scope', '$rootScope', 'angularFireAuth', 'Firebase', function ($scope, $rootScope, angularFireAuth, Firebase) {
    var ref = new Firebase("https://ke.firebaseio.com/");
    angularFireAuth.initialize(ref, {scope: $rootScope, name: "user"});

    $rootScope.login = function() {
        angularFireAuth.login("twitter");
    };
    $rootScope.logout = function() {
        angularFireAuth.logout();
    };

    $rootScope.$on("angularFireAuth:login", function(evt, user) {
        // User logged in.
        console.log("user logged in as " + user.name);
    });
    $rootScope.$on("angularFireAuth:logout", function(evt) {
        // User logged out.
        console.log("user logged out");
    });
    $rootScope.$on("angularFireAuth:error", function(evt, err) {
        // There was an error during authentication.
        console.log("error " + err);
    });
}]);