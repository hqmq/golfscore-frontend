/** @jsx React.DOM **/
var React = require('react');
var Link = require('react-router').Link;

var RecentGames = module.exports = React.createClass({
  getInitialState() {
    return {
      players: [
        {name: "Mikey", id: 1, points: 65}
      ]
    };
  },

  renderPlayers() {
    return this.state.players.map(function(player){
      return (
        <tr>
          <td><Link to="player" params={{id: player.id}}>{player.name}</Link></td>
          <td className="text-right">{player.points}</td>
        </tr>
      );
    });
  },

  render() {
    return (
      <div className="awesomest-players panel">
        <h1>Awesomest Players</h1>
        <table>
          <tr>
            <th>Player</th>
            <th className="text-right">Awesomeness</th>
          </tr>
          {this.renderPlayers()}
        </table>
      </div>
    );
  }
});
