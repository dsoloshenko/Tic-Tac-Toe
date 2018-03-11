var TicTacToe = TicTacToe || {};

TicTacToe.Fields = Backbone.View.extend({
  game: null,
  map: null,
  match: null,

  el: '.fields',

  initialize: function (options) {
    this.game = options.game;
    this.configureMap();
  },

  configureMap: function () {
    this.map = [];
    this.win_combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    _.each(this.$('li'), function (element, index) {
      var position = {
        el: element,
        position: index,
        game: this.game,
        matching: this.matchingCombinations(index)
      };

      this.map.push(new TicTacToe.Field(position));
    }, this);
  },

  // Getting the current position
  getPosition: function (index) {
    return this.map[index];
  },

  // Clear the board
  restart: function () {
    _.each(this.map, function (position) {
      position.clear();
    });
  },

  nextAvailablePosition: function () {
    var _this = this;
    return _.find(this.map, function (position) {
      console.log(position);
      return position.isAvailable();
    });
  },

  matchingCombinations: function (positionIndex) {
    return _.filter(this.win_combinations, function (combination) {
      return _.contains(combination, positionIndex);
    }, this);
  }
});
