/** @jsx React.DOM **/
var assets = require('../assets');
var React = require('React');
var moment = require('moment');

var Trophy = React.createClass({
  played_at() {
    return moment.unix(this.props.record.played_at).format("MMM D, YYYY");
  },
  ordinal() {
    switch(this.props.record.place) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 4:
        return "4th";
      case 5:
        return "5th";
    }
  },
  pictureUrl() {
    switch(this.props.record.place) {
      case 1:
        return assets.urlFor("/images/trophy.gold.png");
      case 2:
        return assets.urlFor("/images/trophy.silver.png");
      default:
        return assets.urlFor("/images/trophy.bronze.png");
    }
  },

  render() {
    return (
      <div className="trophy">
        <img src={this.pictureUrl()} />
        <p>{this.ordinal()} - {this.props.record.course}</p>
        <p>{this.played_at()}</p>
      </div>
    );
  }
});

module.exports = Trophy;
