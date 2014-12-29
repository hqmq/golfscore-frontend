/** @jsx React.DOM **/
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render() {
    return (
      <RouteHandler params={this.props.params} query={this.props.query} />
    );
  }
});

module.exports = App;
