angular.module('demo')
  .factory('soccerFactory', ['$http', function ($http) {
    return {
      list: function () {
        return $http.get('http://www.football-data.org/v1/soccerseasons');
      },
      get: function(id) {
        return $http.get("http://api.football-data.org/v1/soccerseasons/"+ id +"/leagueTable");
      },
      getTeam: function(id) {
        return $http.get("http://api.football-data.org/v1/teams/" + id);
      }
    };
  }]);
