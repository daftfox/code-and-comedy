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

  if(registered){
    $window.close();
  }

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
      preferenceAsked = false,
      interestAsked = false,
      companyAsked = false,
      functAsked = false;
      $scope.name;
      $scope.email;
      $scope.lastname;
      $scope.company;
      $scope.funct;
      $scope.interest;
      $scope.preference;

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

    if(!$scope.interest){
      if(!interestAsked){
        printToConsole(['What interests you the most? (Please enter the corresponding number)',
                        '- 1: Java',
                        '- 2: Microsoft',
                        '- 3: Other']);
        interestAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered an interest'], 'red')
          return;
        }
        $scope.interest = toInterest(cmd[0]);
      }
    }

    if(!$scope.preference){
      if(!preferenceAsked){
        printToConsole(['To which breakout session would you prefer to go? (Please enter the corresponding number)',
                        '- 1: Micro services',
                        '- 2: Apps',
                        '- 3: Scala',
                        '- 4: Microsoft',
                        '- 5: I don\'t know']);
        preferenceAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a preference'], 'red')
          return;
        }
        $scope.preference = toPreference(cmd[0]);
      }
    }

    if($scope.email && $scope.name && $scope.lastname && $scope.interest && $scope.preference){
      form.commit();
      nameAsked = false;
      emailAsked = false;
      lastnameAsked = false;
      companyAsked = false;
      functAsked = false;
      preferenceAsked = false;
      interestAsked = false;
      $scope.name = undefined;
      $scope.email = undefined;
      $scope.lastname = undefined;
      $scope.company = undefined;
      $scope.funct = undefined;
      $scope.interest = undefined;
      $scope.preference = undefined;
      ez = false;
      $scope.$emit('registrationComplete');
    }
  }

  function toInterest(num){
    var interest;
    switch(num){
      case '1':
        interest = "Java";
        break;
      case '2':
        interest = "Microsoft";
        break;
      case '3':
        interest = "Anders";
        break;
    }
    return interest;
  }

  function toPreference(num){
    var preference;
    switch(num){
      case '1':
        preference = "Micro Services";
        break;
      case '2':
        preference = "Apps";
        break;
      case '3':
        preference = "Scala";
        break;
      case '4':
        preference = "Microsoft";
        break;
      case '5':
        preference = "Weet niet";
        break;
    }
    return preference;
  }

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






