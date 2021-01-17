// @TODO: YOUR CODE HERE!


// Part 1


// create scatterplot whcih represents each state with circle elements. 
// include state abbreviation in circles
// circle

// area dimension

// Healthcare vs Poverty

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
d3.csv("./assets/data/data.csv").then(function(usData) {
  console.log(usData);

  // parsing data
  usData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  });

  //scale funct
  var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(usData, d => d.poverty)])
      .range([0, width]);

  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(usData, d => d.healthcare)])
      .range([height, 0]);
  
  // axis funct

  var bAxis = d3.axisBottom(xLinearScale);
  var lAxis = d3.axisLeft(yLinearScale);


});
