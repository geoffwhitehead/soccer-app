//set up Angular app
(function() {

  'use strict';

  var app = angular.module('demo',[]);

  app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        $httpProvider.defaults.headers.common["X-Auth-Token"] = "a1f7ab64ed0f40a48d4d7a3c7be70e34";
    }
  ]);
})();
