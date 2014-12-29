/** @jsx React.DOM **/
var React = require('react');
var moment = require('moment');
var GoogleLineChart = require('./google_line_chart');
var ScoreTable = require('./score_table');
var xhr = require('xhr');

var Game = React.createClass({
  getInitialState() {
    return {
      id: null,
      course_id: null,
      course: null,
      played_at: null,
      player_averages: [],
      scores: [],
    };
  },

  componentWillMount() {
    var that = this;
    xhr({
      uri: "/games/"+this.props.params.id+".json"
    }, function(err, res, body){
      that.setState( JSON.parse(body) );
    });
  },

  render(){
    var mom = moment.unix(this.state.played_at);
    var data = [["blank","jared cook","Mikey","russell","nate priego","ny","chris hopkins","par"],[1,0,-1,2,1,0,2,0],[2,-1,-1,2,1,0,3,0],[3,-2,-1,1,1,-1,4,0],[4,-2,0,0,1,0,3,0],[5,-3,0,1,2,1,2,0],[6,-3,0,0,2,2,1,0],[7,-3,1,0,2,2,1,0],[8,-3,1,0,2,2,1,0],[9,-2,-1,-1,3,2,0,0],[10,-2,-1,0,3,2,3,1],[11,-2,-1,0,3,2,3,2],[12,-1,-1,0,3,1,3,2],[13,-1,-3,0,1,1,3,1],[14,-3,-4,1,-1,2,5,1],[15,-4,-4,2,0,2,7,2],[16,-4,-4,1,1,3,6,2],[17,-5,-4,1,2,3,5,2],[18,-5,-4,1,2,3,5,2]];
    return (
      <div className="container-vertical">
        <h2>{this.state.course} :: {mom.format("MMM D, YYYY @ h:mm a")}</h2>
        <ScoreTable scores={this.state.scores} />
        <GoogleLineChart data={data} height="500px" width="1100px" graphId="running_totals" />
      </div>
    );
  }
});

module.exports = Game;
