/** @jsx React.DOM **/
var React = require('react');
var Link = require('react-router').Link;

var Store = require('../stores/awesomest_players');

var AwesomestPlayers = module.exports = React.createClass({
  getInitialState() {
    return Store.getState();
  },

  componentWillMount() {
    Store.addChangeListener(this.stateChanged);
    Store.load();
  },
  componentWillUnmount() {
    Store.removeChangeListener(this.stateChanged);
  },
  stateChanged() {
    this.setState(Store.getState());
  },

  renderPlayers() {
    return this.state.players.map(function(player){
      return (
        <tr key={player.id}>
          <td><Link to="player" params={player}>{player.name}</Link></td>
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
