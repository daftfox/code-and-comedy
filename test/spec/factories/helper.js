'use strict';

describe('Factory: HelperService', function () {

  var helperService;

  // load the controller's module
  beforeEach(function(){
    module('codeAndComedyApp');
    inject(function(_HelperService_){
      helperService = _HelperService_;
    });
  });

  it('should not validate badly formatted phonenumber', function () {
    expect(helperService.validatePhone('89374564823939284')).toBe(false); // number too long
    expect(helperService.validatePhone('kljhsfklsfklsdjkl')).toBe(false); // contains characters
    expect(helperService.validatePhone('-1')).toBe(false); // negative number
    expect(helperService.validatePhone('061234567')).toBe(false); // too short
  });

  it('should validate correctly formatted numbers', function () {
    expect(helperService.validatePhone('0612345678')).toBe(true); // mobile number
    expect(helperService.validatePhone('0701234567')).toBe(true); // landline
    expect(helperService.validatePhone('0031601234567')).toBe(true); // mobile with country code prefix
    expect(helperService.validatePhone('0031601234567')).toBe(true); // mobile with country code prefix
  });

  it('should not validate badly formatted email addresses', function () {
    expect(helperService.validateEmail('0612345678')).toBe(false);
    expect(helperService.validateEmail('henk')).toBe(false);
    expect(helperService.validateEmail('henk@')).toBe(false);
    expect(helperService.validateEmail('henk@henk')).toBe(false);
    expect(helperService.validateEmail('henk@henk.')).toBe(false);
    expect(helperService.validateEmail('henk@henk.l')).toBe(false);
    expect(helperService.validateEmail('henk@@henk.l')).toBe(false);
  });

  it('should validate correctly formatted email addresses', function () {
    expect(helperService.validateEmail('henk@planet.nl')).toBe(true);
    expect(helperService.validateEmail('henk-en-wilma@planet.nl')).toBe(true);
  });
});
