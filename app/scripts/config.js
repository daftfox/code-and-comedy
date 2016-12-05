'use strict';

angular.module('codeAndComedyApp').constant('CONFIG', config());

function config() {

  return {
    'APP_NAME': 'Code & Comedy',
    'API_URL': (function(){
      var apiURL = '{{API_URL}}';
      if(apiURL.indexOf('{') != -1){
        return "http://go.pardot.com/l/83122/2016-11-23/6k58pq";
      } else {
        return apiURL;
      }
    })()
  };
}
