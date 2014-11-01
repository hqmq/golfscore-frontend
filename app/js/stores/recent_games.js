var xhr = require('xhr');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var state = {
  loaded: false,
  games: []
};

var RecentGames = module.exports = {
  getState: function() {
    return state;
  },

  load: function() {
    if ( state.loaded ) {
      return true;
    }
    xhr({
      uri: "/recent_games.json",
    }, function(err, res, body){
      state.games = JSON.parse(body);
      state.loaded = true;
      notifyChange();
    });
  },

  addChangeListener: function(fn) {
    events.addListener('change', fn);
  },
  removeChangeListener: function(fn) {
    events.removeListener('change', fn);
  }
};

function notifyChange(){
  events.emit('change');
}
