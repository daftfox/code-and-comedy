'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.directive:Breadcrumb
 * @description
 * # Breadcrumb
 *
 */
angular.module('codeAndComedyApp')
  .directive('breadcrumb', Breadcrumb);

function Breadcrumb(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'views/breadcrumb.html',
    controller: ['$scope', '$attrs', '$element', '$rootScope',
      function($scope, $attrs, $element, $rootScope) {
        $scope.currentState;
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          $scope.states = [{name: "main", url: "/"}]
          if(toState.name != "main"){
            $scope.states.push(toState);
          }
          $scope.currentState = toState;
        });
      }
    ]
  }
}
