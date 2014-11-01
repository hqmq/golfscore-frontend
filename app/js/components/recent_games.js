/** @jsx React.DOM **/
var React = require('react');
var moment = require('moment');

var RecentGamesStore = require('../stores/recent_games');

var RecentGames = module.exports = React.createClass({
  getInitialState() {
    return RecentGamesStore.getState();
  },

  componentWillMount() {
    RecentGamesStore.addChangeListener(this.stateChanged);
    RecentGamesStore.load();
  },
  componentWillUnmount() {
    RecentGamesStore.removeChangeListener(this.stateChanged);
  },

  stateChanged() {
    this.setState(RecentGamesStore.getState());
  },

  renderGames() {
    return this.state.games.map(function(game){
      var mom = moment.unix(game.when);
      return (
        <tr>
          <td>{game.course}</td>
          <td className="text-right">{mom.format("ddd MMM Do YYYY")}</td>
        </tr>
      );
    });
  },

  render() {
    return (
      <div className="recent-games panel">
        <h1>Recent Games</h1>
        <table>
          <tr>
            <th>Where</th>
            <th className="text-right">Time</th>
          </tr>
          {this.renderGames()}
        </table>
      </div>
    );
  }
});
