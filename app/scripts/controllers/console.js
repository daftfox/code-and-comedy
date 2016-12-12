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
  $scope.registered = $stateParams.registered;
  $scope.error = $stateParams.error;

  if($scope.registered || $scope.error){
    moveAlongPeopleNothingToSeeHere();
  }

  function moveAlongPeopleNothingToSeeHere(){
    $timeout(function(){
      $window.close();
    }, 3000);
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
      preference1Asked = false,
      preference2Asked = false,
      interestAsked = false,
      companyAsked = false,
      functAsked = false;
      $scope.name;
      $scope.email;
      $scope.lastname;
      $scope.company;
      $scope.funct;
      $scope.interest;
      $scope.preference1;
      $scope.preference2;

  setTimeout(function () {
    init();
    $scope.$apply();
  }, 200);

  function init(){
    printToConsole(['---------------------'], 'limegreen');
    printToConsole(['Beschikbare commando\'s:'], 'blue');
    printToConsole(['- ez : <span class="pre">                         </span>Registreer jezelf',
                    //'- register -m "email address" -n "name" : Register for the Code & Comedy event',
                    //'- as : <span class="pre">                                   </span>Number of available seats',
                    '- help : <span class="pre">                       </span>Dit menu'], 'limegreen');
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
        printToConsole(['Wat is je voornaam?'], 'orange');
        nameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['Je hebt geen naam ingevuld'], 'red')
          return;
        }
        $scope.name = cmd[0];
      }
    }
    if(!$scope.lastname){
      if(!lastnameAsked){
        printToConsole(['Wat is je achternaam?'], 'orange');
        lastnameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['Je hebt geen achternaam ingevuld'], 'red')
          return;
        }
        $scope.lastname = cmd[0];
      }
    }
    if(!$scope.email){
      if(!emailAsked){
        printToConsole(['Wat is je e-mailadres?'], 'orange');
        emailAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0 || !helper.validateEmail(cmd[0])){
          printToConsole(['Je hebt geen e-mailadres ingevuld'], 'red')
          return;
        }
        $scope.email = cmd[0];
      }
    }
    if(!$scope.company){
      if(!companyAsked){
        printToConsole(['Voor welk bedrijf werk je?'], 'orange');
        companyAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['Je hebt geen bedrijfsnaam opgegeven'], 'limegreen');
          $scope.company = null;
        } else {
          $scope.company = cmd[0];
        }
      }
    }
    if(!$scope.funct){
      if(!functAsked){
        printToConsole(['Wat is je functie?'], 'orange');
        functAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['Je hebt geen functie ingevuld'], 'red')
          return;
        }
        $scope.funct = cmd[0];
      }
    }

    if(!$scope.interest){
      if(!interestAsked){
        printToConsole(['Wat heeft je eerste voorkeur? (Geef het bijbehorende nummer op)'], 'orange');
        printToConsole(['- 1: Java',
                        '- 2: Microsoft',
                        '- 3: Scala',
                        '- 4: IoT',
                        '- 5: Oracle',
                        '- 6: Anders']);
        interestAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['Je hebt nog geen voorkeur opgegeven'], 'red')
          return;
        }
        $scope.interest = toInterest(cmd[0]);
      }
    }

    if(!$scope.preference1){
      if(!preference1Asked){
        printToConsole(['Welke break-out sessie zou je willen bezoeken in ronde 1? (Geef het bijbehorende nummer op)'], 'orange');
        printToConsole(['- 1: Who needs GUI\'s? : making the terminal sing.',
                        '- 2: Reactive streams in practice',
                        '- 3: Variable procedural random oak',
                        '- 4: Infrastructuur als code',
                        '- 5: Microsoft is not your enemy',
                        '- 6: KumuluzEE - Developing microservices using Java EE technologies',
                        '- 7: Native script with AngularJS 2',
                        '- 8: Microservices visualized',
                        '- 9: I don\'t know']);
        preference1Asked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a preference'], 'red')
          return;
        }
        $scope.preference1 = toPreference(cmd[0]);
      }
    }

    if(!$scope.preference2){
      if(!preference2Asked){
        printToConsole(['Welke break-out sessie zou je willen bezoeken in ronde 2? (Geef het bijbehorende nummer op)'], 'orange');
        printToConsole(['- 1: Who needs GUI\'s? : making the terminal sing.',
                        '- 2: Reactive streams in practice',
                        '- 3: Variable procedural random oak',
                        '- 4: Infrastructuur als code',
                        '- 5: Microsoft is not your enemy',
                        '- 6: KumuluzEE - Developing microservices using Java EE technologies',
                        '- 7: Native script with AngularJS 2',
                        '- 8: Microservices visualized',
                        '- 9: I don\'t know']);
        preference2Asked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a preference'], 'red')
          return;
        }
        $scope.preference2 = toPreference(cmd[0]);
      }
    }

    if($scope.email && $scope.name && $scope.lastname && $scope.interest && $scope.preference1 && $scope.preference2){
      form.commit();
      nameAsked = false;
      emailAsked = false;
      lastnameAsked = false;
      companyAsked = false;
      functAsked = false;
      preference1Asked = false;
      preference2Asked = false;
      interestAsked = false;
      $scope.name = undefined;
      $scope.email = undefined;
      $scope.lastname = undefined;
      $scope.company = undefined;
      $scope.funct = undefined;
      $scope.interest = undefined;
      $scope.preference1 = undefined;
      $scope.preference2 = undefined;
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
        interest = "Scala";
        break;
      case '4':
        interest = "IoT";
        break;
      case '5':
        interest = "Oracle";
        break;
      case '6':
        interest = "Anders";
        break;
    }
    return interest;
  }

  function toPreference(num){
    var preference;
    switch(num){
      case '1':
        preference = "Who needs GUI's? : making the terminal sing";
        break;
      case '2':
        preference = "Reactive streams in practice";
        break;
      case '3':
        preference = "Variable prcedural random oak";
        break;
      case '4':
        preference = "Infrastructure als code";
        break;
      case '5':
        preference = "Microsoft is not your enemy";
        break;
      case '6':
        preference = "KumuluzEE - developing microservices using Java EE technologies";
        break;
      case '7':
        preference = "Native script with AngularJS 2";
        break;
      case '8':
        preference = "Microservices visualized";
        break;
      case '9':
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






