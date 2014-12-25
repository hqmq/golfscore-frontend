/** @jsx React.DOM **/
var React = require('react');
var Store = require('../stores/player');
var xhr = require('xhr');

var Player = module.exports = React.createClass({
  getInitialState() {
    return {
      id: null,
      name: null,
    };
  },
  componentWillMount() {
    var that = this;
    xhr({
      uri: "/players/"+this.props.params.id+".json"
    }, function(err, res, body) {
      that.setState( JSON.parse(body) );
    });
  },

  render() {
    return (
      <div class="player">
        <h1>Player {this.state.name}({this.state.id})</h1>
        <h2>Is Awesome!</h2>
      </div>
    );
  }
});
