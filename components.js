
angular.module('demo')
  .component("soccerComponent", {
    templateUrl: "components/soccerComponent.html",
    bindings: { data: '<' },
    controller: 'SoccerController'
  });
