/** @jsx React.DOM **/
var React = require('react');
var moment = require('moment');
var ScoreTable = require('./score_table');
var xhr = require('xhr');

var Game = React.createClass({
  getInitialState() {
    return {
      id: null,
      course_id: null,
      course: null,
      played_at: null,
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
    return (
      <div className="container-vertical">
        <h2>{this.state.course} :: {mom.format("MMM D, YYYY @ h:mm a")}</h2>
        <ScoreTable scores={this.state.scores} />
      </div>
    );
  }
});

module.exports = Game;
