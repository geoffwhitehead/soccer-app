angular.module('demo')
    .controller('SoccerController', ['soccerFactory', function(soccerFactory) {
    let self = this;
    let POINTS_FOR_WIN  = 3;

    self.season = {};
    self.seasons = [];
    self.league = [];
    self.selectedSeason = null;
    self.team = {};

    self._getInfo;
    self._getIndexofSelectedSeason;
    self._markRelegationCandidates;
    self._getTeamInfo;
    self._isChampion;
    self._isRelegated;

    // get a list of leagues to display in the select box
    soccerFactory.list().then(function(res) {
      self.seasons = res.data;
    })

    // get details of the selected league. Perform some data manipulaton on the returned data
    self._getInfo = function(id) {
      soccerFactory.get(id).then(function(res) {
        self.league = res.data;
        console.log(self.league);
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
      let pattern = new RegExp(/[^/]+(?=\/$|$)/);
      let id = link.match(pattern)[0];

      soccerFactory.getTeam(id).then(function(res) {
        self.team = res.data;
      })
    }

    // determine if leader is champion - assuming the API always return a sorted array
    self._isChampion = function() {
      let isChampion = true;
      let gamesPerTeam = ( self.league.standing.length - 2 ) * 2;
      let leaderScore = self.league.standing[0].points;

      for (var i = 1; i < self.league.standing.length; i++) {
        let gamesRemaining = gamesPerTeam - self.league.standing[i].playedGames;
        let currentPoints = self.league.standing[i].points;
        let highestPossibleScore = currentPoints + ( POINTS_FOR_WIN * gamesRemaining );

        if (highestPossibleScore >= leaderScore) {
          isChampion = false;
        }

        // set variable on leader object
        if (i == self.league.standing.length) {
          self.league.standing[0].isChampion == isChampion;
        }
      }
    }

    // determine if relegated - assuming data returned from API is sorted by position
    self._isRelegated = function() {
      let gamesPerTeam = ( self.league.standing.length - 2 ) * 2;
      let pointThreshold = self.league.standing[self.league.standing.length - 4];

      for (var i = self.league.standing.length-1; i > self.league.standing.length - 4; i--) {
        let gamesRemaining = gamesPerTeam - self.league.standing[i].playedGames;
        let currentPoints = self.league.standing[i].points;
        let highestPossibleScore = currentPoints + ( POINTS_FOR_WIN * gamesRemaining );
        if (highestPossibleScore < pointThreshold) {
          self.league.standing[i].isRelegated == true;
        }
      }
    }

  }]);
