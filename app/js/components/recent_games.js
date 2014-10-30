/** @jsx React.DOM **/
var React = require('react');

var RecentGames = module.exports = React.createClass({
  getInitialState() {
    return {
      games: [
        {course: "Trafalga Orem Lighthouse", when: 1414645531, id: 1}
      ]
    };
  },

  renderGames() {
    return this.state.games.map(function(game){
      return (
        <tr>
          <td>{game.course}</td>
          <td>{game.when}</td>
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
            <th>Time</th>
          </tr>
          {this.renderGames()}
        </table>
      </div>
    );
  }
});
