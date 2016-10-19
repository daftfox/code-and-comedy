'use strict';

angular.module('codeAndComedyApp').constant('CONFIG', config());

function config() {

  return {
    'APP_NAME': 'Code & Comedy',
    'API_URL': (function(){
      var apiUrl = '{{API_URL}}';
      if(apiUrl.indexOf('API_URL') != -1){
        return 'http://localhost:3000/api/';
      } else {
        return apiUrl;
      }
    })()
  };
}
