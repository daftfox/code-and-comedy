'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.controller:ConsoleCtrl
 * @description
 * # ConsoleCtrl
 * Controller of the codeAndComedyApp
 */
angular.module('codeAndComedyApp')
  .controller('ConsoleCtrl', ['$scope', '_', 'HelperService', 'CONFIG', '$timeout', '$stateParams', '$window', ConsoleCtrl]);

function ConsoleCtrl ($scope, _, helper, CONFIG, $timeout, $stateParams, $window) {
  $scope.pardotURL = CONFIG.API_URL;
  var form;
  var registered = $stateParams.registered;

  // allow view to render before grabbing form
  $timeout(function(){
    form = $scope.phoneyCommit;
  });

  var numBadTries = 0;
  var ee = false,
      ez = false,
      nameAsked = false,
      lastnameAsked = false,
      emailAsked = false,
      //phoneAsked = false,
      companyAsked = false,
      functAsked = false;
      $scope.name;
      $scope.email;
      $scope.lastname;
      $scope.company;
      $scope.funct;

  setTimeout(function () {
    init();
    $scope.$apply();
  }, 200);

  function init(){
    printToConsole(['---------------------'], 'limegreen');
    printToConsole(['Available commands:'], 'blue');
    printToConsole(['- ez : <span class="pre">                                   </span>Interactive registration',
                    //'- register -m "email address" -n "name" : Register for the Code & Comedy event',
                    //'- as : <span class="pre">                                   </span>Number of available seats',
                    '- help : <span class="pre">                                 </span>This menu'], 'limegreen');
    printToConsole(['---------------------'], 'limegreen');
    if(registered){
      printTicket();
    }
  }

  function printToConsole(text, level){
    $scope.$broadcast('terminal-output', {
      output: true,
      text: text,
      breakLine: true,
      level: level
    });
  }

  function printSeatsLeft(){
    RegistrationsService.availability(function(res){
      var seatsLeft = res.availability;
      var level;
      if(seatsLeft == 0){
        level = 'red';
      }
      printToConsole([seatsLeft + " seats left"], level);
    }, function(err){
      printToConsole(['An error occured.', 'Please try again later or contact the administrator'], 'red');
    });
  }

  function ezRegistration(cmd){
    if(!$scope.name){
      if(!nameAsked){
        printToConsole(['What is your first name?']);
        nameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a name'], 'red')
          return;
        }
        $scope.name = cmd[0];
      }
    }
    if(!$scope.lastname){
      if(!lastnameAsked){
        printToConsole(['What is your last name?']);
        lastnameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a last name'], 'red')
          return;
        }
        $scope.lastname = cmd[0];
      }
    }
    if(!$scope.email){
      if(!emailAsked){
        printToConsole(['What is your E-Mail address?']);
        emailAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0 || !helper.validateEmail(cmd[0])){
          printToConsole(['You have not entered a valid E-Mail address'], 'red')
          return;
        }
        $scope.email = cmd[0];
      }
    }
    if(!$scope.company){
      if(!companyAsked){
        printToConsole(['What company do you represent?']);
        companyAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a company name'], 'limegreen');
          $scope.company = null;
        } else {
          $scope.company = cmd[0];
        }
      }
    }
    if(!$scope.funct){
      if(!functAsked){
        printToConsole(['What is your function?']);
        functAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a function'], 'red')
          return;
        }
        $scope.funct = cmd[0];
      }
    }

    var guest = {
      Voornaam: $scope.name,
      Achternaam: $scope.lastname,
      email: $scope.email,
      company: $scope.company,
      funct: $scope.funct
    };

    if($scope.email && $scope.name && $scope.lastname){
      form.commit();
      nameAsked = false;
      emailAsked = false;
      lastnameAsked = false;
      companyAsked = false;
      functAsked = false;
      $scope.name = undefined;
      $scope.email = undefined;
      $scope.lastname = undefined;
      $scope.company = undefined;
      $scope.funct = undefined;
      ez = false;
      $scope.$emit('registrationComplete');
    }
  }

  $scope.submit = function(){

  };

  $scope.$on('terminal-input', function (e, consoleInput) {
    // split the entire string so we can interpret word by word
    var cmd = consoleInput[0].command.split(' ');

    if(ez){
      ezRegistration(cmd);
      return;
    }

    // register the user for the CnC-event
    // DEPRECATED
    /*if(cmd.indexOf('register') !== -1){
      registerGuest(cmd);
      return;
    }*/

    // display the number of available seats
    if(cmd.indexOf('ez') !== -1){
      ez = true;
      ezRegistration(cmd);
      return;
    }

    // display the number of available seats
    // DEPRECATED
    /*if(cmd.indexOf('as') !== -1){
      printSeatsLeft();
      return;
    }*/

    if(cmd.indexOf('printTicket') !== -1){
      printTicket();
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
        ], 'blue'
      );
      var i = 0;
      var interval = setInterval(function(){
        i++;
        printToConsole(["."], 'blue');
        if(i >= 5){
          printToConsole(["42"], 'blue');
          clearInterval(interval);
        }
        $scope.$apply();
      }, 500);
      return;
    }

    if(!ee){
      if(numBadTries < 3 && numBadTries >= 0){
        printToConsole(['Unknown command: ' + consoleInput[0].command], 'yellow');
      } else if(numBadTries < 4 && numBadTries >= 3){
        printToConsole(['Try the \'help\' command for a list of available commands'], 'yellow');
      } else if(numBadTries >= 4){
        printToConsole(['Are you dense or are you trying to trick me?'], 'yellow');
        numBadTries = -1;
        ee = true;
      }
      numBadTries++;
    } else {
      printToConsole(['Stop that right now.'], 'red');
    }
  });

  $scope.$on('ezRegistration', function(){
    ez = true;
    ezRegistration();
  })

  function printTicket(){
    printToConsole([
      '<span class="pre">  *****************************</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">{     |  CODE AND COMEDY  |     }</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">{     |     8 februari    |     }</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">{     | ORDINA NIEUWEGEIN |     }</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">  *****************************</span>'
    ], 'blue');
  }
}






