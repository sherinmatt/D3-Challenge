// @TODO: YOUR CODE HERE!
// healthcate vs poverty

// Part 1


// create scatterplot whcih represents each state with circle elements. 
// include state abbreviation in circles
// circle

// area dimension

var svgWidth = 900;
var svgHeight = 500;

// chartsMargin
var chartsMargin = {
    top: 35,
    right: 35,
    bottom: 65,
    left: 85
};

// making dimensions of chart area
var width = svgWidth - chartsMargin.left - chartsMargin.right;
var height = svgHeight - chartsMargin.top - chartsMargin.bottom;

// appending svg
var svg = d3 
     .select("#scatter")
     .append("svg")
     .attr("height", svgHeight)
     .attr("width", svgWidth);

// appenging
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartsMargin.left}, ${chartsMargin.top})`);

// getting data
