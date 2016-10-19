'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the codeAndComedyApp
 */
angular.module('codeAndComedyApp')
  .controller('RegisterCtrl', ['$scope', '$rootScope', registerCtrl]);

function registerCtrl($scope, $rootScope) {
  $scope.ez = false;
  $scope.registrationComplete = false;
  $scope.ezRegistration = function(){
    $scope.ez = true;
    $scope.$broadcast('ezRegistration')
  };

  $scope.$on('registrationComplete', function(){
    $scope.ez = false;
    $scope.registrationComplete = true;
  });
}
