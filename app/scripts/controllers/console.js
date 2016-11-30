'use strict';

/**
 * @ngdoc function
 * @name codeAndComedyApp.controller:ConsoleCtrl
 * @description
 * # ConsoleCtrl
 * Controller of the codeAndComedyApp
 */
angular.module('codeAndComedyApp')
  .controller('ConsoleCtrl', ['$scope', '_', 'RegistrationsService', 'HelperService', ConsoleCtrl]);

function ConsoleCtrl ($scope, _, RegistrationsService, helper) {
  var numBadTries = 0;
  var ee = false,
      ez = false,
      nameAsked = false,
      lastnameAsked = false,
      emailAsked = false,
      phoneAsked = false,
      companyAsked = false,
      functAsked = false,
      name,
      email,
      lastname,
      phone,
      company,
      funct;

  setTimeout(function () {
    init();
    $scope.$apply();
  }, 200);

  function init(){
    printToConsole(['---------------------'], 'limegreen');
    printToConsole(['Available commands:'], 'blue');
    printToConsole(['- ez : <span class="pre">                                   </span>Interactive registration for less experienced users',
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

  /*function registerGuest(cmd){
    var email = cmd[cmd.indexOf('-m') + 1].replace('"', '');
    var name = cmd[cmd.indexOf('-n') + 1].replace('"', '');
    var output;
    if(!name || cmd.indexOf('-n') === -1){
      printToConsole(['You have not entered a valid name'], 'red')
      return;
    }
    if(!email || cmd.indexOf('-m') === -1 || !helper.validateEmail(email)){
      printToConsole(['You have not entered a valid E-Mail address'], 'red')
      return;
    }

    registerUser(name, email, function(){
      nameAsked = false;
      emailAsked = false;
      name = undefined;
      email = undefined;
      ez = false;
      $scope.$emit('registrationComplete');
    });
  }*/

  function ezRegistration(cmd){
    if(!name){
      if(!nameAsked){
        printToConsole(['What is your first name?']);
        nameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a name'], 'red')
          return;
        }
        name = cmd[0];
      }
    }
    if(!lastname){
      if(!lastnameAsked){
        printToConsole(['What is your last name?']);
        lastnameAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a last name'], 'red')
          return;
        }
        lastname = cmd[0];
      }
    }
    if(!email){
      if(!emailAsked){
        printToConsole(['What is your E-Mail address?']);
        emailAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0 || !helper.validateEmail(cmd[0])){
          printToConsole(['You have not entered a valid E-Mail address'], 'red')
          return;
        }
        email = cmd[0];
      }
    }
    if(!phone){
      if(!phoneAsked){
        printToConsole(['What is your phone number?']);
        phoneAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0 || !validatePhone(cmd[0])){
          printToConsole(['You have not entered a valid phone number'], 'red')
          return;
        }
        phone = cmd[0];
      }
    }
    if(!company){
      if(!companyAsked){
        printToConsole(['What company do you represent?']);
        companyAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a company name'], 'red')
          return;
        }
        company = cmd[0];
      }
    }
    if(!funct){
      if(!functAsked){
        printToConsole(['What is your function?']);
        functAsked = true;
        return;
      } else {
        if(!cmd[0] || cmd[0].length == 0){
          printToConsole(['You have not entered a function'], 'red')
          return;
        }
        funct = cmd[0];
      }
    }

    if(email && name){
      registerUser(name, email, function(){
        nameAsked = false;
        emailAsked = false;
        lastnameAsked = false;
        phoneAsked = false;
        companyAsked = false;
        functAsked = false;
        name = undefined;
        email = undefined;
        lastname = undefined;
        phone = undefined;
        company = undefined;
        funct = undefined;
        ez = false;
        $scope.$emit('registrationComplete');
      });
    }
  }

  // Validates mobile- or landline number
  // returns true if valid, false if not
  function validatePhone(phone) {
    var vast_nummer = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
    var mobiel_nummer = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
    return (vast_nummer.test(phone) || mobiel_nummer.test(phone));
  }

  // Register a user for the event
  // Accepts user object and stores user in data storage
  // TODO: expect user object
  function registerUser(name, email, cb){
    var output;
    var registration = {
      email: email,
      name: name,
      event_id: 1
    };

    RegistrationsService.register(registration, function(res){
      output = [
        name + ' has been registered with E-Mail address ' + email + '.',
        '&nbsp;',
        'You will receive your confirmation and ticket per E-Mail within a few minutes.',
        'We hope you will enjoy your evening.'
      ];

      printToConsole(output, 'green');
      printTicket();
      cb();
    }, function(err){
      console.log(err);
      switch(err.status){
        case 409:
          output = ['The user ' + name + ' has already registered with the e-mail address ' + email + ' before.',
            'Please try again with a different account.'];
          break;
        default:
          output = ['An error occured.', 'Please try again later or contact the administrator'];
          break;
      }
      printToConsole(output, 'red');
      cb();
    });
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
      '<span class="pre">{     |    17 februari    |     }</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">{     | ORDINA NIEUWEGEIN |     }</span>',
      '<span class="pre"> }    |                   |    {</span>',
      '<span class="pre">  *****************************</span>'
    ], 'blue');
  }
}






