var TicTacToe = TicTacToe || {};

TicTacToe.Game = Backbone.View.extend({
  board: null,
  players: null,
  modals: null,

  el: '.game-wrapper',

  events: {
    'click .play': 'restartGame',
    'click .restart': 'restartGame'
  },

  initialize: function () {
    this.players = new TicTacToe.Players();
    this.board = new TicTacToe.Fields({game: this});
    this.modals = TicTacToe.Modal.all();

    this.configureListeners();
  },

  configureListeners: function () {
    this.modals.winner.configureListeners(this);
    this.modals.draw.configureListeners(this);
    this.listenTo(this, 'move', this.nextPlayer);
  },

  // New game
  restartGame: function () {
    // Clean the fields
    this.board.restart();
    // Human is the first player
    this.players.reset();
  },

  // Get current player
    currentPlayer: function () {
    return this.players.getCurrent();
  },

  // Define next player
  nextPlayer: function (playedPosition) {
    var player = this.players.next();

    if (this.isWinner(playedPosition) || this.isDraw()) {
      return;
    }

    player.move(this.board);
  },

  // ==============================================FINISH RULES==========================================

  // Define winner
  isWinner: function (playedPosition) {
    if (playedPosition && playedPosition.matchWin()) {
      this.trigger('winner', playedPosition.getPlayer());

      return true;
    }

    return false;
  },

  // Define draw
  isDraw: function () {
    if (!this.board.nextAvailablePosition()) {
      this.trigger('draw');
      return true;
    }

    return false;
  }
});
