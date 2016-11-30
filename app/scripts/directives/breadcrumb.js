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
    controller: ['$scope', '$attrs', '$element', '$rootScope', '$state',
      function($scope, $attrs, $element, $rootScope, $state) {
        $scope.currentState;

        //console.log($state.get());
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          $scope.states = [];
          var states = $state.get();
          for(var i = 0; i < states.length; i++){
            if(states[i].name != ""){
              $scope.states.push(states[i]);
            }
          }
          $scope.currentState = toState;
        });

        $scope.goTo = function(state){
          $state.go(state);
        };
      }
    ]
  }
}
