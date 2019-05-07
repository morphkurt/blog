function renderWeeklyLoadGraph(data,fdow){
  var margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 50
  },

  width = 700 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;

  var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
  var parseTimeSeconds = d3.timeParse('%s');
  var parseTimePace = d3.timeParse('%M:%S');


  data.forEach(function(d) {
      d._id.fdow = parseTime(d._id.fdow);
      d.pace=parseTimePace(d.avgSpeedTime);
  });
   
  var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  x.domain(fdow.map(function(d){
	return parseTimeSeconds(d/1000);
  }));



  var xAxis = d3.axisBottom(x)
  .tickFormat(d3.timeFormat("%b %Y"))
  .tickValues(x.domain().filter(function(d,i){ return !(i%6)}));

  
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  var yAxis = d3.axisLeft()
    .scale(y)

 
  var svg = d3.select("#weekly-runs")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
     //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 700 200")
    //class to make it responsive
    .classed("svg-content-responsive", true) 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  y.domain([0, d3.max(data, function(d) {
    return d.totaldistance;
  })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Total Distance");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
	return x(d._id.fdow);
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d) {
      return y(d.totaldistance);
    })
    .attr("height", function(d) {
      return height - y(d.totaldistance);
    })
}

function renderWeeklyPerformanceSpeedGraph(data,fdow){
  var margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
  },

  width = 1000 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;

  var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
  var parseTimeSeconds = d3.timeParse('%s');
  var parseTimePace = d3.timeParse('%M:%S');

   
  var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  x.domain(fdow.map(function(d){
	return parseTimeSeconds(d/1000);
  }));



  var y = d3.scaleTime()
	  .range([height, 0]);  
  
  var xAxis = d3.axisBottom(x)
  .tickFormat(d3.timeFormat("%b %Y"))
  .tickValues(x.domain().filter(function(d,i){ return !(i%4)}));
  
  var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(d3.timeFormat("%M:%S"))
  
 
//Weekly Runs
  var svg = d3.select("#weekly-speed-performance").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
var dataval = ["07:30", "05:15"];
var specifier = "%M:%S";
var parsedDataval = dataval.map(function(d) {
  return d3.timeParse(specifier)(d)
}); 
  
  y.domain(d3.extent(parsedDataval));
/*
 var clip = svg.append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", height);

  */

  svg.append("g")
 
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg.append("g")

    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Average Speed");

    var threshold = "06:00";

    var median = svg.append("line")
                     .attr("x1", 0)
                     .attr("y1", y(d3.timeParse(specifier)(threshold)))
                     .attr("x2", width)
                     .attr("y2", y(d3.timeParse(specifier)(threshold)))
                     .attr("stroke-width", 1)
                     .attr("stroke", "grey");


  var valueline = d3.line()
    .x(function(d) { return x(d._id.fdow); })
    .y(function(d) { return y(d.pace); })
    .defined(function(d) { return d.pace; }) 
  svg.append("path")
    //  .attr("clip-path", "url(#clip)")
      .data([data])
      .style("stroke","steelblue")
      .attr("class", "line")
      .attr("d", valueline);

}

function renderWeeklyPerformanceGraph(data,fdow){
  var margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
  },

  width = 1000 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;

  //var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
  var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
  //data.forEach(function(d) {
  //    d._id.fdow = parseTime(d._id.fdow);
  //});
  var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
  var parseTimeSeconds = d3.timeParse('%s');
  var parseTimePace = d3.timeParse('%M:%S');

   
  var y = d3.scaleLinear()
    .range([height, 0]);
  x.domain(fdow.map(function(d){
	return parseTimeSeconds(d/1000);
  }));


  var y = d3.scaleLinear()
    .range([height, 0]);
  
  
  var xAxis = d3.axisBottom(x)
  .tickFormat(d3.timeFormat("%b %Y"))
  .tickValues(x.domain().filter(function(d,i){ return !(i%4)}));

  
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  
  var yAxis = d3.axisLeft()
    .scale(y)

 
//Weekly Runs
  var svg = d3.select("#weekly-performance").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  y.domain([140, d3.max(data, function(d) {
    return d.avgHR;
  })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Average HR");

  var valueline = d3.line()
    .x(function(d) { return x(d._id.fdow); })
    .y(function(d) { return y(d.avgHR); });

  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

}

function type(d) {
  d.totaldistance = +d.totaldistance;
  return d;
}

