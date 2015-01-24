/** @jsx React.DOM **/
var React = require('react');
var moment = require('moment');
var GoogleLineChart = require('./google_line_chart');
var ScoreTable = require('./score_table');
var xhr = require('xhr');
var _ = require('underscore');

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
    if( this.state.course ) {
      var graph_data = this.graphData();
      return (
        <div className="container-vertical">
          <h2>{this.state.course} :: {mom.format("MMM D, YYYY @ h:mm a")}</h2>
          <ScoreTable scores={this.state.scores} />
          <GoogleLineChart data={graph_data}
                           height="500px"
                           width="1100px"
                           title="Running Totals vs Average"
                           graphId="running_totals" />
        </div>
      );
    } else {
      return <h3>...Loading Game...</h3>;
    }
  },

  graphData() {
    var scores = this.state.scores;
    var num_scores = scores.length;
    var num_holes = scores[0].holes.length;
    var sum_holes = [];
    for(var i = 0; i < num_holes; i++){ sum_holes.push(0); }
    scores.forEach(function(score){
      score.holes.forEach(function(hole,idx){
        sum_holes[idx] = sum_holes[idx] + hole;
      });
    });

    var avg_holes = sum_holes.map(function(sum){ return sum/num_scores; });
    var total = 0;
    var avg_running_total = avg_holes.map(function(hole){ total = total + hole; return total; });

    scores.forEach(function(score){
      var total = 0;
      score.running_total = score.holes.map(function(hole){ total = total + hole; return total; });
      score.averages = score.running_total.map(function(hole,idx){ return hole - avg_running_total[idx]; })
    });
    var x_axis = ["blank"];
    for(var i = 1; i <= num_holes; i++){ x_axis.push(i); }
    var matrix = [x_axis];
    scores.forEach(function(score){
      matrix.push( [score.name].concat(score.averages) );
    });

    return _.zip.apply(_,matrix);
  }
});

module.exports = Game;
