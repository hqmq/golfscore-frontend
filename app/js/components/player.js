/** @jsx React.DOM **/
var React = require('react');

var Player = module.exports = React.createClass({
  render() {
    return (
      <h1>Player {this.props.id}</h1>
    );
  }
});
