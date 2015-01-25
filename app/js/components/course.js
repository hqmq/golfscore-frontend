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
      <div>
        <div className="container left">
          <h1>{this.state.name}</h1>
        </div>
        <div className="container">
          <GoogleLineChart data={this.graphData()}
                           height="300px"
                           width="1100px"
                           title="Course Par"
                           graphId="course_par" />
        </div>
        <div className="container">
          <div className="records panel">
            <table>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
              {this.renderRecords()}
            </table>
          </div>
          <div className="recent-games panel">
            <table>
              <tr><th>Recent Games</th></tr>
              {this.renderGames()}
            </table>
          </div>
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

  renderRecords() {
    return this.state.records.map(function(record){
      var mom = moment.unix(record.played_at);
      return (
        <tr key={record.id}>
          <td>{record.place}</td>
          <td>
            <Link to="player" params={{id: record.player_id}}>{record.player}</Link>
          </td>
          <td>{record.total}</td>
          <td>
            <Link to="game" params={{id: record.game_id}}>
              {mom.format("ddd MMM Do YYYY")}
            </Link>
          </td>
        </tr>
      );
    });
  },

  graphData() {
    var data = this.state.par.map(function(val, idx){ return [idx + 1, val]; });
    data.unshift(["blank","par"]);
    return data;
  }
});

module.exports = Course;
