'use strict';

angular.module('codeAndComedyApp')
  .factory('HelperService', ['_', HelperService]);

function HelperService(){
  // Validates email address
  // returns true if valid, false if not
  function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Validates mobile- or landline number
  // returns true if valid, false if not
  function validatePhone(phone) {
    var vast_nummer = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
    var mobiel_nummer = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
    return (vast_nummer.test(phone) || mobiel_nummer.test(phone));
  }

  return {
    validateEmail: validateEmail,
    validatePhone: validatePhone
  }
}
