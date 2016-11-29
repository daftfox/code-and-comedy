'use strict';

angular.module('codeAndComedyApp')
  .service('RegistrationsService', ['$resource', 'CONFIG', registrationsService]);

function registrationsService($resource, CONFIG){
  var url = CONFIG.API_URL;
  var registrationsService = {
    call: $resource(url, null, {
      register:     {method: "POST"}
    })
  };

  return {
    register:     function(registration, cb){cb();}//registrationsService.call.register // temporary stub
  };
}
