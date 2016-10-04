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
      '---------------------',
      ' Available commands:',
      ' - register -m "email address" -n "name": Register for the Code & Comedy event',
      ' - as: Number of available seats',
      ' - help: This menu',
      '---------------------',]
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
    // split the entire string so we can interpret word by word
    var cmd = consoleInput[0].command.split(' ');

    // register the user for the CnC-event
    if(cmd.indexOf('register') !== -1){
      registerGuest(cmd);
      return;
    }

    // display the number of available seats
    if(cmd.indexOf('as') !== -1){
      printSeatsLeft();
      return;
    }

    // summon help menu
    if(cmd.indexOf('help') !== -1){
      init();
      return;
    }

    // The ultimate question
    if(consoleInput[0].command.indexOf('What is the answer to life, the universe and everything?') !== -1){
      printToConsole(
        [
          "The answer is:"
        ]
      );
      var i = 0;
      var interval = setInterval(function(){
        i++;
        printToConsole(["."]);
        if(i >= 5){
          printToConsole(["42"]);
          clearInterval(interval);
        }
      }, 500);
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
