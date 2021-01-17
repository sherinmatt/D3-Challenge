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

  // apending axes 
  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bAxis);

    chartGroup.append("g")
      .call(lAxis);

  // circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(usData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty +1.6))
  .attr("cy", d => yLinearScale(d.healthcare +0.3))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".4");

  // label


// health
  chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - chartsMargin.left + 45)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Lack of Healthcare (%)");
  // poverty
  chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + chartsMargin.top + 9})`)
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("In Poverty (%)");

}).catch(function(error) {
      console.log(error);

});
