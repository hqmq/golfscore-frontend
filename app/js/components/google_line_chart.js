/** @jsx React.DOM **/
var React = require('react');

/**
Assumes that the Google Visualizations "CoreChart" package is already loaded
So in your <head> you will need:
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript">¬
    google.load('visualization','1',{packages:['corechart']});¬
  </script>¬
**/
var GoogleLineChart = React.createClass({
  componentDidMount() {
    this.drawCharts();
  },
  componentDidUpdate() {
    this.drawCharts();
  },
  render() {
    return <div id={this.props.graphId} style={{height: this.props.height, width: this.props.width}}></div>;
  },

  drawCharts(){
    var data = google.visualization.arrayToDataTable(this.props.data);
    var options = {
      title: this.props.title
    };
    var node = document.getElementById(this.props.graphId);
    var chart = new google.visualization.LineChart(node);
    chart.draw(data, options);
  }
});

module.exports = GoogleLineChart;
