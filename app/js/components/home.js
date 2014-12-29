/** @jsx React.DOM **/
var React = require('react');
var RecentGames = require('./recent_games');
var AwesomestPlayers = require('./awesomest_players');

var Home = React.createClass({
  render() {
    return (
      <div className="container">
        <RecentGames />
        <AwesomestPlayers />
      </div>
    );
  }
});

module.exports = Home;
