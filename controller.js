angular.module('demo')
    .controller('SoccerController', ['soccerFactory', function(soccerFactory) {
    let self = this;

    self.season = {};
    self.seasons = [];
    self.league = [];
    self.selectedSeason = null;
    self.team = {};

    self._getInfo;
    self._getIndexofSelectedSeason;
    self._markRelegationCandidates;
    self._getTeamInfo;

    // get a list of leagues to display in the select box
    soccerFactory.list().then(function(res) {
      self.seasons = res.data;
    })

    // get details of the selected league. Perform some data manipulaton on the returned data
    self._getInfo = function(id) {
      soccerFactory.get(id).then(function(res) {
        self.league = res.data;
        self._markRelegationCandidates();
        self._getIndexofSelectedSeason(id);
      })
    };

    // check relegation candidates - this assumes that the returned array is sorted by position
    self._markRelegationCandidates = function() {
      for (var i = self.league.standing.length-1; i > self.league.standing.length - 4; i--) {
        self.league.standing[i].isRelegationCandidate = true;
      }
    }

    // find the index of the selected season - used to display the season details in table
    self._getIndexofSelectedSeason = function(id) {
      for (var i = 0; i < self.seasons.length;  i++) {
        if (self.seasons[i].id == id) {
          self.selectedSeason = i;
        }
      }
    }

    // fetch the info for selected team.
    self._getTeamInfo = function(link) {
      var pattern = new RegExp(/[^/]+(?=\/$|$)/);
      var id = link.match(pattern)[0];

      soccerFactory.getTeam(id).then(function(res) {
        self.team = res.data;
      })
    }

  }]);
