'use strict';

angular.module('codeAndComedyApp').constant('CONFIG', config());

function config() {

  return {
    'APP_NAME': 'Code & Comedy',
    'API_URL': 'http://localhost:3000/api/'
  };
}
