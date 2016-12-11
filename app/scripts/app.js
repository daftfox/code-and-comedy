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
    'vtortola.ng-terminal',
    'underscore'
  ]).config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    var mainState = {
      name: 'main',
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    };

    var registerState = {
      name: 'tickets',
      url: '/register?registered&error',
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    };

    var contactState = {
      name: 'contact',
      url: '/contact',
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    };

    var locationState = {
      name: 'location',
      url: '/location',
      templateUrl: 'views/location.html',
      controller: 'LocationCtrl'
    };

    var newsState = {
      name: 'news',
      url: '/news',
      templateUrl: 'views/news.html',
      controller: 'NewsCtrl'
    };

    var programState = {
      name: 'program',
      url: '/program',
      templateUrl: 'views/program.html',
      controller: 'ProgramCtrl'
    };

    var speakersState = {
      name: 'speakers',
      url: '/speakers',
      templateUrl: 'views/speakers.html',
      controller: 'SpeakersCtrl'
    };

    var breakoutCtrl = {
      name: 'break-out sessies',
      url: '/break-out-sessions',
      templateUrl: 'views/breakout.html',
      controller: 'BreakoutCtrl'
    };

    $stateProvider.state(mainState);
    $stateProvider.state(registerState);
  $stateProvider.state(programState);
  $stateProvider.state(newsState);
  $stateProvider.state(speakersState);
  $stateProvider.state(breakoutCtrl);
  $stateProvider.state(locationState);
  $stateProvider.state(contactState);

    //$locationProvider.html5Mode(true).hashPrefix('!');
  });
