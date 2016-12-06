'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.directive:dfFormCommit
 * @description
 * # dfFormCommit
 * Add submit functionality to form elements
 */

angular.module('codeAndComedyApp')
  .directive("dfFormCommit", [dfFormCommit]);

function dfFormCommit(){
  return {
    require:"form",
    link: function($scope, $el, $attr, $form) {
      $form.commit = function() {
        $scope.$apply();
        $el[0].submit();
      };
    }
  };
};
