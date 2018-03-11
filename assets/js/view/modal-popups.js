var TicTacToe = TicTacToe || {};

TicTacToe.Modal = Backbone.View.extend({
    hide: function () {
      this.$el.addClass('hide');
    },

    show: function () {
      this.$el.removeClass('hide');
    }
  },

  {
    all: function () {
      return {
        winner: new TicTacToe.WinnerModal(),
        draw: new TicTacToe.DrawModal()
      }
    }
  });

TicTacToe.WinnerModal = TicTacToe.Modal.extend({
  template: _.template( $('#template-winner').html() ),

  el: '.popups',

  events: {
    'click .play': 'hide'
  },

  configureListeners: function(game) {
    this.listenTo(game, 'winner', this.show);
  },

  render: function(game) {
    this.$('.winner').html(this.template());
  },

  show: function(player) {
    this.render();
    this.$('b').text(player.getLabel());
    this.$('.overlay, .winner').removeClass('hide');
  },

  hide: function() {
    this.$('.overlay, .winner').addClass('hide');
  }
});

TicTacToe.DrawModal = TicTacToe.Modal.extend({
  template: _.template( $('#template-draw').html() ),

  el: '.popups',

  events: {
    'click .play': 'hide'
  },

  configureListeners: function(game) {
    this.listenTo(game, 'draw', this.show);
  },

  render: function() {
    this.$('.draw').html(this.template());
  },

  show: function() {
    this.render();
    this.$('.overlay, .draw').removeClass('hide');
  },

  hide: function() {
    this.$('.overlay, .draw').addClass('hide');
  }
});

