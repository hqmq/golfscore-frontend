/** @jsx React.DOM **/
var React = require('react');
var Link = require('react-router').Link;

var ScoreTable = React.createClass({
  listOfHoles: function(){
    var numHoles = this.props.scores[0].holes.length;
    var l = [];
    var i = 1;
    while( i <= numHoles ) { l.push(i++) }
    return l;
  },

  render() {
    if (this.props.scores.length > 0) {
      return (
        <table className="score-table">
          {this.renderRows()}
        </table>
      )
    } else {
      return <span>...Waiting...</span>;
    }
  },

  renderPlayerRows() {
    var that = this;
    return this.props.scores.map(function(score){
      return (
        <tr key={score.id}>
          {that.renderScoreColumns(score)}
        </tr>
      );
    });
  },
  renderRows() {
    var header = <tr key="headers">{this.renderHeaders()}</tr>;
    return [header].concat(this.renderPlayerRows());
  },
  renderScoreColumns(score) {
    var sum = score.holes.reduce(function(i,sum){ return sum + i; }, 0);
    var cols = [
      <td key="player"><Link to="player" params={{id: score.player_id}}>{score.name}</Link></td>
    ];
    score.holes.forEach(function(hole, idx){
      cols.push( <td key={idx}>{hole}</td> );
    });
    cols.push( <td key="total">{sum}</td> );
    return cols;
  },
  renderHeaders() {
    var headers = ['Player'];
    headers = headers.concat(this.listOfHoles());
    headers = headers.concat(['Total']);
    return headers.map(function(header){
      return <th key={header}>{header}</th>;
    });
  }
});

module.exports = ScoreTable;
