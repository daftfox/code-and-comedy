'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.controller:ConsoleCtrl
 * @description
 * # ConsoleCtrl
 * Controller of the codeAndComedyApp
 */
angular.module('codeAndComedyApp')
  .controller('ConsoleCtrl', ['$scope', '_', ConsoleCtrl]);

function ConsoleCtrl ($scope, _) {
  var numBadTries = 0;
  var ee = false;

  setTimeout(function () {
    init();
  }, 200);

  function init(){
    printToConsole([
      '---------------',
      'Available commands:',
      '- register -m "email address" -n "name": Register for the Code & Comedy event',
      '- as: Number of available seats',
      '- help: This menu',
      '---------------',]
    );
  }

  function printToConsole(text){
    $scope.$broadcast('terminal-output', {
      output: true,
      text: text,
      breakLine: true
    });
    $scope.$apply();
  }

  function printSeatsLeft(){
    printToConsole(["34 seats left"]);
  }

  function registerGuest(cmd){
    var email = cmd[cmd.indexOf('-m') + 1].replace('"', '');
    var name = cmd[cmd.indexOf('-n') + 1].replace('"', '');
    if(!name || cmd.indexOf('-n') === -1){
      printToConsole(['You have not entered a valid name'])
      return;
    }
    if(!email || cmd.indexOf('-m') === -1){
      printToConsole(['You have not entered a valid E-Mail address'])
      return;
    }
    var output = [
      name + ' has been registered with E-Mail address ' + email + '.',
      '',
      'We hope you will enjoy your evening.'
    ]
    printToConsole(output);
  }

  $scope.$on('terminal-input', function (e, consoleInput) {
    var cmd = consoleInput[0].command.split(' ');

    if(cmd.indexOf('register') !== -1){
      registerGuest(cmd);
      return;
    }
    if(cmd.indexOf('as') !== -1){
      printSeatsLeft();
      return;
    }
    if(cmd.indexOf('help') !== -1){
      init();
      return;
    }

    if(!ee){
      if(numBadTries < 3 && numBadTries >= 0){
        printToConsole(['Unknown command: ' + consoleInput[0].command]);
      } else if(numBadTries < 4 && numBadTries >= 3){
        printToConsole(['Try the \'help\' command for a list of available commands']);
      } else if(numBadTries >= 4){
        printToConsole(['Are you dense or are you trying to trick me?']);
        numBadTries = -1;
        ee = true;
      }
      numBadTries++;
    } else {
      printToConsole(['Stop that right now.']);
    }
  });
}
