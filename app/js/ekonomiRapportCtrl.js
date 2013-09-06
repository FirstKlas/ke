angular.module('myApp.controllers').controller('ekonomiRapportCtrl', ['$scope', '$window', 'Firebase', 'angularFireCollection', function ($scope, $window, Firebase, angularFireCollection) {
    $scope.report = {};

    $scope.report.incomeAnna = 0;
    $scope.report.incomeKlas = 0;

    $scope.report.inkopSum = 6000;
    $scope.report.inkopAnna = 0;
    $scope.report.inkopKlas = 0;

    $scope.report.rakningarSum = 25000;
    $scope.report.rakningarAnna = 0;
    $scope.report.rakningarKlas = 0;

    $scope.report.buffertSum = 5000;
    $scope.report.buffertAnna = 0;
    $scope.report.buffertKlas = 0;

    $scope.report.totalAnna = 0;
    $scope.report.totalKlas = 0;

    $scope.report.leftAnna = 0;
    $scope.report.leftKlas = 0;

    $scope.report.percAnna = 0;
    $scope.report.percKlas = 0;

    $scope.report.utlaggAnna = 0;
    $scope.report.utlaggKlas = 0;
    $scope.report.utlaggResultat = "--";
    $scope.report.utlaggAdjusted = "";

    $scope.report.notes = "...";

    $scope.report.currDate = new Date();
    $scope.report.selectMonth = $scope.report.currDate.getMonth() + 1;
    $scope.report.selectYear = $scope.report.currDate.getFullYear();

    $scope.report.adjustExpenses = false;

    $scope.report.reporter = "Anna";


    $scope.updatePercentage = function () {
        $scope.report.totalIncome = $scope.report.incomeKlas + $scope.report.incomeAnna;
        $scope.report.percAnna = $window.Math.round((100 * $scope.report.incomeAnna) / $scope.report.totalIncome);
        $scope.report.percKlas = $window.Math.round((100 * $scope.report.incomeKlas) / $scope.report.totalIncome);
        $scope.updateInkop();
        $scope.updateRakningar();
        $scope.updateBuffert();
        $scope.updateTotal()
    };

    $scope.updateUtlagg = function () {
        if ($scope.report.utlaggAnna > $scope.report.utlaggKlas) {
            $scope.report.utlaggResultat = "Klas är skyldig Anna " + ($scope.report.utlaggAnna - $scope.report.utlaggKlas)
        } else if ($scope.report.utlaggKlas > $scope.report.utlaggAnna) {
            $scope.report.utlaggResultat = "Anna är skyldig Klas " + ($scope.report.utlaggKlas - $scope.report.utlaggAnna)
        } else {
            $scope.report.utlaggResultat = "--"
        }
    };

    $scope.updateInkop = function () {
        $scope.report.inkopAnna = $window.Math.round(($scope.report.percAnna / 100) * $scope.report.inkopSum);
        $scope.report.inkopKlas = $window.Math.round(($scope.report.percKlas / 100) * $scope.report.inkopSum);
        $scope.updateTotal();
    };

    $scope.updateRakningar = function () {
        $scope.report.rakningarAnna = $window.Math.round(($scope.report.percAnna / 100) * $scope.report.rakningarSum);
        $scope.report.rakningarKlas = $window.Math.round(($scope.report.percKlas / 100) * $scope.report.rakningarSum);
        $scope.updateAdjustExpenses();
        $scope.updateTotal();
    };

    $scope.updateBuffert = function () {
        $scope.report.buffertAnna = $window.Math.round(($scope.report.percAnna / 100) * $scope.report.buffertSum);
        $scope.report.buffertKlas = $window.Math.round(($scope.report.percKlas / 100) * $scope.report.buffertSum);
        $scope.updateTotal();
    };

    $scope.updateTotal = function () {
        $scope.report.totalAnna = $scope.report.inkopAnna + $scope.report.rakningarAnna + $scope.report.buffertAnna;
        $scope.report.totalKlas = $scope.report.inkopKlas + $scope.report.rakningarKlas + $scope.report.buffertKlas;

        $scope.report.leftAnna = $scope.report.incomeAnna - $scope.report.totalAnna;
        $scope.report.leftKlas = $scope.report.incomeKlas - $scope.report.totalKlas;
    };

    $scope.updateAdjustExpenses = function () {
        var expenseDiff = 0;
        if ($scope.report.adjustExpenses) {
            if ($scope.report.utlaggAnna > $scope.report.utlaggKlas) {
                expenseDiff = $scope.report.utlaggAnna - $scope.report.utlaggKlas;
                $scope.report.rakningarAnna = $scope.report.rakningarAnna - expenseDiff;
                $scope.report.rakningarKlas = $scope.report.rakningarKlas + expenseDiff;
            } else if ($scope.report.utlaggKlas > $scope.report.utlaggAnna) {
                expenseDiff = $scope.report.utlaggKlas - $scope.report.utlaggAnna;
                $scope.report.rakningarAnna = $scope.report.rakningarAnna + expenseDiff;
                $scope.report.rakningarKlas = $scope.report.rakningarKlas - expenseDiff;
            }
            $scope.report.utlaggAdjusted = "Skulden är reglerad genom Räkningar."
            $scope.updateTotal();
        } else {
            $scope.report.rakningarAnna = $window.Math.round(($scope.report.percAnna / 100) * $scope.report.rakningarSum);
            $scope.report.rakningarKlas = $window.Math.round(($scope.report.percKlas / 100) * $scope.report.rakningarSum);
            $scope.report.utlaggAdjusted = ""
            $scope.updateTotal();
        }
    };

    $scope.saveReport = function () {
        $scope.report.dateStamp = new Date();

        var url = 'https://ke.firebaseio.com/';
        $scope.reports = angularFireCollection(new Firebase(url));
        $scope.reports.add($scope.report);


    };
}