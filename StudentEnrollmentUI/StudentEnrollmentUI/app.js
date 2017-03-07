var enrollApp = angular.module("myModule", [])

enrollApp.controller("myController", function ($scope, $http) {
    //var students = [
    //    { studentId: "1", firstname: "Abraham", lastname: "june", email:"june@uwm.edu", address: "30 fig road", phone: "23232233232", IsMasters: true, IsPhd: false, isDoingCapstone: true, IsDoingThesis: false }
    //];
    //$scope.students = students;
    $scope.message = "Hello from us";

    $http({
        method: 'GET',
        url: 'http://localhost:9000/students'
    }).then(function (response) {
        $scope.students = response.data;
    });

    
   
});


