'use strict';

/**
 * @ngdoc overview
 * @name codeAndComedyApp
 * @description
 * # codeAndComedyApp
 *
 * Main module of the application.
 */
angular
  .module('codeAndComedyApp', [
    'ngAnimate',
    'ui.router',
    'ngResource',
    'vtortola.ng-terminal',
    'underscore'
  ]).config(function($stateProvider, $locationProvider) {
    var mainState = {
      name: 'main',
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }

    var registerState = {
      name: 'register',
      url: '/register',
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    }

    $stateProvider.state(mainState);
    $stateProvider.state(registerState);

    $locationProvider.html5Mode(true);
  });
