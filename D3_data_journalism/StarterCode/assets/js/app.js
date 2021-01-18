// @TODO: YOUR CODE HERE!


// Part 1

//Objectives:
// make scatterplot which shows each state in US with the circle elements. 
// also ishow state abbreviation in circles
//focus here is on lack of healthcare vs rates of poverty by US State


// area dimensions
var svgWidth = 960;
var svgHeight = 560;

// chartsMargin are the following
var chartsMargin = {
    top: 10,
    right: 20,
    bottom: 40,
    left: 90
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

// appending
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

  //scale functions
  //poverty
  var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(usData, d => d.poverty)])
      .range([0, width]);
//healthcare
  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(usData, d => d.healthcare)])
      .range([height, 0]);
  
  // axis functions
  var bAxis = d3.axisBottom(xLinearScale);
  var lAxis = d3.axisLeft(yLinearScale);

  // apending axes 
  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bAxis);

    chartGroup.append("g")
      .call(lAxis);

  // building circles 
  var circlesGroup = chartGroup.selectAll("circle")
  .data(usData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty +1.6))
  .attr("cy", d => yLinearScale(d.healthcare +0.3))
  .attr("r", "15")
  .attr("fill", "green")
  .attr("opacity", ".4");

  // labels
  //state abbreviations
  chartGroup.append("text")
    .selectAll("tspan")
    .data(usData)
    .enter()
    .append("tspan")
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("fill", "white")

      .attr("x", function(data){
        return xLinearScale(data.poverty +1.6);
      }
      )
      .attr("y", function(data){
        return yLinearScale(data.healthcare +0.4);
      }
      )
      .text(function(data){
        return data.abbr
      });
//label
// healthcare
  chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - chartsMargin.left + 45)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .attr("font-weight", "bold")
     .attr("font-size", "15px")
     .text("Lack of Healthcare (%)");
  //label
  // poverty
  chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + chartsMargin.top + 9.5})`)
     .attr("dy", "1em")
     .attr("class", "axisText")
     .attr("font-weight", "bold")
     .attr("font-size", "15px")
     .text("In Poverty (%)");

}).catch(function(error) {
      console.log(error);
});
