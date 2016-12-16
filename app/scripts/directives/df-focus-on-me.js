'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.directive:dfFocusOnMe
 * @description
 * # dfFocusOnMe
 * Set attribute of element to focus on as df-focus-on-me
 * to auto-focus when the element is drawn.
 */

angular.module('codeAndComedyApp')
  .directive('dfFocusOnMe', ['$timeout', dfFocusOnMe]);

function dfFocusOnMe($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, $rootScope) {
      $timeout(function() {
        element[0].focus();
      });
    },
    controller: function ($scope, $attrs, $element, $rootScope) {
      $rootScope.$on('$focusNow', function(){
        $element[0].focus();
      });
    }
  };
}
