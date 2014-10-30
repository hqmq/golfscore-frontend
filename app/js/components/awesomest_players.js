/** @jsx React.DOM **/
var React = require('react');

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
          <td>{player.name}</td>
          <td>{player.points}</td>
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
            <th>Awesomness</th>
          </tr>
          {this.renderPlayers()}
        </table>
      </div>
    );
  }
});
