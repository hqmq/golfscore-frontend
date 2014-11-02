var xhr = require('xhr');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var state = {
  loaded: false,
  players: []
};

var AwesomestPlayers = module.exports = {
  getState: function() {
    return state;
  },

  load: function() {
    if ( state.loaded ) {
      return true;
    }
    xhr({
      uri: "/awesomest_players.json",
    }, function(err, res, body){
      state.players = JSON.parse(body);
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
