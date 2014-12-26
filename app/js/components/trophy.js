/** @jsx React.DOM **/
var React = require('React');
var moment = require('moment');

var Trophy = module.exports = React.createClass({
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
    }
  },
  pictureUrl() {
    switch(this.props.record.place) {
      case 1:
        return "/images/trophy.gold.png";
      case 2:
        return "/images/trophy.silver.png";
      case 3:
        return "/images/trophy.bronze.png";
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
