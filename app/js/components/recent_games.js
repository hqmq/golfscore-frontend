/** @jsx React.DOM **/
var React = require('react');
var Link = require('react-router').Link;
var moment = require('moment');

var RecentGamesStore = require('../stores/recent_games');

var RecentGames = React.createClass({
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
      var mom = moment.unix(game.played_at);
      return (
        <tr key={game.id}>
          <td>
            <Link to="course" params={{id: game.course_id}}>
              {game.course}
            </Link>
          </td>
          <td className="text-right">
            <Link to="game" params={game}>
              {mom.format("ddd MMM Do YYYY")}
            </Link>
          </td>
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

module.exports = RecentGames;
