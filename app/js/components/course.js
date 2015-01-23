/** @jsx React.DOM **/
var React = require('react');
var Link = require('react-router').Link;
var moment = require('moment');
var GoogleLineChart = require('./google_line_chart');
var xhr = require('xhr');

var Course = React.createClass({
  getInitialState() {
    return {};
  },

  componentWillMount() {
    var that = this;
    xhr({
      uri: "/courses/"+this.props.params.id+".json"
    }, function(err, res, body){
      console.log( JSON.parse(body) );
      that.setState( JSON.parse(body) );
    });
  },

  render(){
    if( this.state.id ) {
      return (
        <div className="container">
          <div className="course panel">
            <h1>{this.state.name}</h1>
            <h3>Games Played: {this.state.number_of_games_played}</h3>
          </div>
          <div className="recent-games panel">
            <table>
              <tr><th>Recent Games</th></tr>
              {this.renderGames()}
            </table>
          </div>
        </div>
      );
    } else {
      return <h3>...Loading Course...</h3>;
    }
  },

  renderGames() {
    return this.state.recent_games.map(function(game){
      var mom = moment.unix(game.played_at);
      return (
        <tr key={game.id}>
          <td><Link to="game" params={game}>{mom.format("ddd MMM Do YYYY")}</Link></td>
        </tr>
      );
    });
  },
});

module.exports = Course;
