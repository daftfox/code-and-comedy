"use strict";function config(){return{APP_NAME:"KIT",API_URL:"http://127.0.0.1:10010/"}}function ConsoleCtrl(a,b,c,d){function e(){f(["---------------------"],"limegreen"),f([" Available commands:",' - register -m "email address" -n "name": Register for the Code & Comedy event'," - as: Number of available seats"," - help: This menu"],"green"),f(["---------------------"],"limegreen")}function f(b,c){a.$broadcast("terminal-output",{output:!0,text:b,breakLine:!0,level:c})}function g(){c.availability(function(a){var b,c=a.availability;0==c&&(b="red"),f([c+" seats left"],b)},function(a){f(["An error occured.","Please try again later or contact the administrator"],"red")})}function h(a){var b,e=a[a.indexOf("-m")+1].replace('"',""),g=a[a.indexOf("-n")+1].replace('"',"");if(!g||a.indexOf("-n")===-1)return void f(["You have not entered a valid name"],"red");if(!e||a.indexOf("-m")===-1||!d.validateEmail(e))return void f(["You have not entered a valid E-Mail address"],"red");var h={email:e,name:g,event_id:1};c.register(h,function(a){b=[g+" has been registered with E-Mail address "+e+".","","We hope you will enjoy your evening."],f(b,"green")},function(a){switch(console.log(a),a.status){case 409:b=["The user "+g+" has already registered with the e-mail address "+e+" before.","Please try again with a different account."];break;default:b=["An error occured.","Please try again later or contact the administrator"]}f(b,"red")})}var i=0,j=!1;setTimeout(function(){e(),a.$apply()},200),a.$on("terminal-input",function(b,c){var d=c[0].command.split(" ");if(d.indexOf("register")!==-1)return void h(d);if(d.indexOf("as")!==-1)return void g();if(d.indexOf("help")!==-1)return void e();if(c[0].command.indexOf("What is the answer to life, the universe and everything?")===-1)j?f(["Stop that right now."],"red"):(i<3&&i>=0?f(["Unknown command: "+c[0].command],"yellow"):i<4&&i>=3?f(["Try the 'help' command for a list of available commands"],"yellow"):i>=4&&(f(["Are you dense or are you trying to trick me?"],"yellow"),i=-1,j=!0),i++);else{f(["The answer is:"],"blue");var k=0,l=setInterval(function(){k++,f(["."],"blue"),k>=5&&(f(["42"],"blue"),clearInterval(l)),a.$apply()},500)}})}function registrationsService(a,b){var c=b.API_URL+"registration/:eventId/:action",d={call:a(c,null,{register:{method:"POST"},availability:{method:"GET",params:{action:"availability",eventId:1}}})};return{register:d.call.register,availability:d.call.availability}}function Breadcrumb(){return{restrict:"E",transclude:!0,templateUrl:"views/breadcrumb.html",controller:["$scope","$attrs","$element","$rootScope","$state",function(a,b,c,d,e){a.currentState,d.$on("$stateChangeSuccess",function(b,c,d,f,g){a.states=[];for(var h=e.get(),i=0;i<h.length;i++)""!=h[i].name&&a.states.push(h[i]);a.currentState=c}),a.goTo=function(a){e.go(a)}}]}}function HelperService(){function a(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)}return{validateEmail:a}}angular.module("codeAndComedyApp",["ngAnimate","ui.router","ngResource","vtortola.ng-terminal","underscore"]).config(["$stateProvider","$locationProvider",function(a,b){var c={name:"main",url:"/",templateUrl:"views/main.html",controller:"MainCtrl"},d={name:"register",url:"/register",templateUrl:"views/register.html",controller:"RegisterCtrl"};a.state(c),a.state(d),b.html5Mode(!0)}]),angular.module("codeAndComedyApp").constant("CONFIG",config()),angular.module("codeAndComedyApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("codeAndComedyApp").controller("ConsoleCtrl",["$scope","_","RegistrationsService","HelperService",ConsoleCtrl]),angular.module("codeAndComedyApp").controller("RegisterCtrl",function(){}),angular.module("codeAndComedyApp").service("RegistrationsService",["$resource","CONFIG",registrationsService]),angular.module("codeAndComedyApp").directive("breadcrumb",Breadcrumb),angular.module("vtortola.ng-terminal",[]).provider("terminalConfiguration",function(){var a=function(){var a={};return a.typeSoundUrl=null,a.startSoundUrl=null,a.promptConfiguration={end:":>",user:"fordprefect",separator:"@",path:"cncreg\\"},a.getTypeEffect=null,a.getStartEffect=null,a.outputDelay=0,a.allowTypingWriteDisplaying=!0,a},b=function(){var b=a(),c={};return c.default=b,b.config=function(b){var d=c[b];return d||(d=a(),c[b]=d),d},b.$get=["$q",function(a){var b=function(a,b){var c=a.defer(),d=new XMLHttpRequest;return d.open("GET",b,!0),d.responseType="arraybuffer",d.onload=function(){window.AudioContext=window.AudioContext||window.webkitAudioContext;var a=new AudioContext;a.decodeAudioData(d.response,function(b){c.resolve(function(){var c=a.createBufferSource();c.buffer=b,c.connect(a.destination),c.start(0)})})},d.send(),c.promise};for(var d in c){var e=c[d];e.typeSoundUrl&&(e.getTypeEffect=b(a,e.typeSoundUrl)),e.startSoundUrl&&(e.getStartEffect=b(a,e.startSoundUrl))}return function(a){return c[a]}}],b};return b()}).service("promptCreator",[function(){var a=function(a){var b,c,d,e,f={};a=a?a.promptConfiguration:null;var g=function(){f.text=b+d+c+e};return f.resetPath=function(){c=a&&a.path?a.path:"\\",g()},f.resetUser=function(){b=a&&a.user?a.user:"anon",g()},f.reset=function(){b=a&&null!=a.user?a.user||"":"anon",c=a&&null!=a.path?a.path||"":"\\",d=a&&null!=a.separator?a.separator||"":"@",e=a&&null!=a.end?a.end||"":":>",g()},f.user=function(a){return a&&(b=a,g()),b},f.path=function(a){return a&&(c=a,g()),c},f.text="",f.reset(),f};return a}]).controller("terminalController",["$scope","terminalConfiguration","promptCreator",function(a,b,c){var d=/[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;a.commandLine="",a.results=[],a.showPrompt=!0,a.typeSound=function(){},a.configName=a.configName||"default",a.init=function(d){var e=b(d);a.prompt=c(e),a.outputDelay=e.outputDelay,a.allowTypingWriteDisplaying=e.allowTypingWriteDisplaying,e.getTypeEffect&&e.getTypeEffect.then(function(b){a.typeSound=b}),e.getStartEffect&&e.getStartEffect.then(function(a){a()})},a.init("default");var e=[],f=-1;a.handlePaste=function(b){a.commandLine+=b.clipboardData.getData("text/plain"),a.$$phase||a.$apply()},a.$on("terminal-output",function(b,c){c.added||(c.added=!0,a.results.push(c))}),a.$on("terminal-command",function(b,c){if("clear"==c.command)a.results.splice(0,a.results.length),a.$$phase||a.$apply();else if("change-prompt"==c.command)c.prompt&&(c.prompt.user&&a.prompt.user(c.prompt.user),c.prompt.path&&a.prompt.path(c.prompt.path),a.$$phase||a.$apply());else if("reset-prompt"==c.command){var d=!0;c.prompt&&(c.prompt.user?(a.prompt.resetUser(),d=!1):c.prompt.path&&(a.prompt.resetPath(),d=!1)),d&&a.prompt.reset(),a.$$phase||a.$apply()}}),a.keypress=function(b){a.commandLine.length<80&&(f=-1,a.commandLine+=String.fromCharCode(b),a.$$phase||a.$apply())},a.previousCommand=function(){f==-1&&(f=e.length),0!=f&&(a.commandLine=e[--f],a.$$phase||a.$apply())},a.nextCommand=function(){f!=-1&&(f<e.length-1?(a.commandLine=e[++f],a.$$phase||a.$apply()):(a.commandLine="",a.$$phase||a.$apply()))};var g=function(a){return a.replace(d,"")};a.execute=function(){var b=g(a.commandLine);a.commandLine="",b&&(e.length>10&&e.splice(0,1),b!=e[e.length-1]&&e.push(b),a.results.push({type:"text",text:[a.prompt.text+b]}),a.$emit("terminal-input",[{command:b}]),a.$apply())},a.backspace=function(){a.commandLine&&(a.commandLine=a.commandLine.substring(0,a.commandLine.length-1),a.$apply())}}]).directive("terminal",["$document",function(a){return{restrict:"E",controller:"terminalController",transclude:!0,replace:!0,template:"<section class='terminal' ng-paste='handlePaste($event)'><div class='terminal-viewport'><div class='terminal-results'></div><span class='terminal-prompt' ng-show='showPrompt'>{{prompt.text}}</span><span class='terminal-input'>{{commandLine}}</span><span class='terminal-cursor'>_</span><input type='text' ng-model='commandLine' class='terminal-target'/></div><div ng-transclude></div></section>",compile:function(b,c,d){return{pre:function(a,b,c,d){},post:function(b,c,d,e){function f(a,c,d,e){setTimeout(function(){b.typeSound(),a.textContent+=d<c.length?c[d]:"",d<c.length-1?(b.typeSound(),f(a,c,d+1,e)):e&&e()},b.outputDelay)}var g=c,h=angular.element(c[0].querySelector(".terminal-target")),i=angular.element(c[0].querySelector(".terminal-viewport")),j=angular.element(c[0].querySelector(".terminal-results")),k=(angular.element(c[0].querySelector(".terminal-prompt")),angular.element(c[0].querySelector(".terminal-cursor")));angular.element(c[0].querySelector(".terminal-input"));navigator.appVersion.indexOf("Trident")!=-1&&g.addClass("damn-ie");var l=d.terminalClass;l&&g.addClass(l);var m=d.terminalConfig;b.init(m||"default"),setInterval(function(){var b=a[0].activeElement==h[0];b?k.toggleClass("terminal-cursor-hidden"):h.hasClass("terminal-cursor-hidden")||k.addClass("terminal-cursor-hidden")},500);var n=!1;c.on("mouseover",function(){n=!0}),c.on("mouseleave",function(){n=!1}),i.on("click",function(){h[0].focus(),g.toggleClass("terminal-focused",!0)}),h.on("blur",function(a){n||g.toggleClass("terminal-focused",!1)}),h.on("keypress",function(a){(b.showPrompt||b.allowTypingWriteDisplaying)&&b.keypress(a.which),a.preventDefault()}),h.on("keydown",function(a){9==a.keyCode&&a.preventDefault(),8==a.keyCode?((b.showPrompt||b.allowTypingWriteDisplaying)&&b.backspace(),a.preventDefault()):13==a.keyCode?(b.showPrompt||b.allowTypingWriteDisplaying)&&b.execute():38==a.keyCode?((b.showPrompt||b.allowTypingWriteDisplaying)&&b.previousCommand(),a.preventDefault()):40==a.keyCode&&((b.showPrompt||b.allowTypingWriteDisplaying)&&b.nextCommand(),a.preventDefault())}),b.$watchCollection(function(){return b.results},function(a,c){if(c.length&&!a.length)for(var d=j.children(),e=0;e<d.length;e++)d[e].remove();b.showPrompt=!1;for(var g=[function(){b.showPrompt=!0,b.$$phase||b.$apply(),i[0].scrollTop=i[0].scrollHeight}],h=0;h<a.length;h++){var k=a[h];if(!k.displayed)if(k.displayed=!0,b.outputDelay)for(var e=k.text.length-1;e>=0;e--){var l=document.createElement("pre");l.className="terminal-line "+k.level;var m=k.text[e];if(b.outputDelay&&k.output){l.textContent="  ";var n=g.length-1;(function(){var a=l,b=m,c=g[n],d=e==k.text.length-1&&k.breakLine;g.push(function(){if(j[0].appendChild(a),f(a,b,0,c),i[0].scrollTop=i[0].scrollHeight,d){var e=document.createElement("br");j[0].appendChild(e)}})})()}else l.textContent=m,j[0].appendChild(l)}else{for(var e=0;e<k.text.length;e++){var l=document.createElement("pre");l.textContent=k.output?"  ":"",l.className="terminal-line "+k.level,l.textContent+=k.text[e],j[0].appendChild(l)}if(k.breakLine){var o=document.createElement("br");j[0].appendChild(o)}}}g[g.length-1]()})}}}}}]);var underscore=angular.module("underscore",[]);underscore.factory("_",["$window",function(a){return a._}]),angular.module("codeAndComedyApp").factory("HelperService",["_",HelperService]),angular.module("codeAndComedyApp").run(["$templateCache",function(a){a.put("views/breadcrumb.html",'<div class="breadcrumb"> <div class="border-bottom left"></div> <div class="item" ng-repeat="state in states track by $index" ng-class="{\'inactive pointer\': state.name !== currentState.name}" ng-click="goTo(state.name)"> <div class="left tab-border" ng-class="{\'first\': $first, \'last\': $last}"></div> <div class="tab-body"> <span ng-disabled="currentState.name === state.name">{{state.name}}.js</span> </div> <!--div ng-if="currentState.name !== \'main\' && state.name !== \'main\'" class="btn btn-xs btn-default pull-right" ui-sref="main">\n      <i class="glyphicon glyphicon-remove"></i>\n    </div--> <div class="right tab-border" ng-class="{\'first\': $first, \'last\': $last}"></div> </div> <div class="border-bottom right"></div> </div>'),a.put("views/main.html",'<header> <p class="code comment"> /* Are you a driven software engineer and curious about Ordina\'s vision on the<br> &nbsp;* area of software development? Do you want to be taught, entertained and inspired?<br> &nbsp;* <a ui-sref="register">Register now</a> because you don\'t want to miss this!<br> &nbsp;* We are looking forward to meeting you on Tuesday November 17th at our main office.<br> &nbsp;*/ </p> </header> <div class="schedule"> <p class="code"> <span class="limegreen">#Code-And-Comedy</span><span class="white">{</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">location</span><span class="white">:</span><span class="yellow">&nbsp;"Ringwade 1, Nieuwegein"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">16:00</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Reception with drink and bite"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">17:15</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Break-out sessions: Java, Smart and Microsoft Solutions"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">18:25</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Walking dinner and fair"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">19:30</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Code by Kevin Henley"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">20:50</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Comedy by Soula Notos & Andy Valvur"</span><span class="white">;</span><br> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">21:25</span><span class="white">:</span><span class="yellow">&nbsp;&nbsp;&nbsp;&nbsp;"Finale & drinks"</span><span class="white">;</span><br> <span class="white">}</span> </p> </div>'),a.put("views/register.html",'<header> <p class="code comment"> /* Register below and receive your ticket to Code & Comedy<br> &nbsp;* or <a ui-sref="main">return</a> to the previous page.<br> &nbsp;*/ </p> </header> <div ng-controller="ConsoleCtrl" class="console"> <terminal> </terminal> </div>')}]);