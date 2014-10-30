/** @jsx React.DOM **/
var React = require('react');

var App = module.exports = React.createClass({
  render() {
    return (
      <this.props.activeRouteHandler />
    );
  }
});
