'use strict';

angular.module('codeAndComedyApp')
  .service('RegistrationsService', ['$resource', 'CONFIG', registrationsService]);

function registrationsService($resource, CONFIG){
  var url = CONFIG.API_URL;
  console.log(url);
  var registrationsService = {
    call: $resource(url, null, {
      register:     {method: "POST"}
    })
  };

  return {
    register:     registrationsService.call.register
  };
}
