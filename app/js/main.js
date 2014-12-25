/** @jsx React.DOM **/
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/app');
var Home = require('./components/home');
var NotFound = require('./components/not_found');
var Player = require('./components/player');

var routes = (
  <Route handler={App}>
    <Router.DefaultRoute handler={Home} />
    <Router.Route name="player" path="/players/:id" handler={Player} />
    <Router.NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler params={state.params} query={state.query}/>, document.body);
});
