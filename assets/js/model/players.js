var TicTacToe = TicTacToe || {};

TicTacToe.Players = Backbone.Model.extend({
  labels: ['X', '0'],
  players: [],
  current: 0,

  initialize: function () {
    this.players[0] = new TicTacToe.Human({label: this.labels[0]});
    this.players[1] = new TicTacToe.Computer({label: this.labels[1]});
  },

  reset: function () {
    this.current = 0;
  },

  next: function () {
    this.current = this.current == 0 ? 1 : 0;
    return this.getCurrent();
  },

  getCurrent: function () {
    return this.players[this.current];
  }
});


TicTacToe.Human = Backbone.Model.extend({
  move: function(board) {
  },

  setLabel: function(label) {
    this.set('label', label);
  },

  getLabel: function() {
    return this.get('label');
  }
});


TicTacToe.Computer = TicTacToe.Human.extend({
  move: function (board) {
    this.nextMove(board).playerMove();
  },

  nextMove: function (board) {
    if (board.getPosition(1).isAvailable()) {
      return board.getPosition(1);
    }

    return board.nextAvailablePosition();
  }
});


