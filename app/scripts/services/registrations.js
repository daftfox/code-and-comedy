angular.module('codeAndComedyApp')
  .service('RegistrationsService', ['$resource', 'CONFIG', registrationsService]);

function registrationsService($resource, CONFIG){
  var url = CONFIG.API_URL + 'registration/:eventId/:action';
  var registrationsService = {
    call: $resource(url, null, {
      register:     {method: "POST"},
      availability: {method: "GET", params: {action: "availability", eventId: 1}}
    })
  };

  return {
    register:     registrationsService.call.register,
    availability: registrationsService.call.availability
  }
}
