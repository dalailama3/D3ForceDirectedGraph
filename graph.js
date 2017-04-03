$("document").ready(function () {
  $.ajax({
    url: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
    dataType: "json"
  }).done(function (data) {
      var links = data.links
      var nodes = data.nodes

      const width = 900
      const height = 800
      const radius = 6
      const forceCharge = -100;
      const linkDistance = 60;


      var force = d3.layout.force()
         .size([width, height])
         .nodes(nodes) //add nodes
         .links(links) //add links
         .on("tick", tick)
         .linkDistance(linkDistance)
         .charge(forceCharge)
         .start();

       var graph = d3.select('.graph')
       //
      //  var tip = d3.tip()
      //   .attr('class', 'd3-tip')
      //   .offset([-10, 0])
      //   .html(function(d) {
      //     return "<span>" + d.country + "</span>"
      //   })
        var svg = graph.append("svg")
          .attr("width", width)
          .attr("height", height)


        var link = svg.selectAll('.link')
          .data(data.links)
          .enter()
          .append('line')
          .attr('class', 'link');

          var tooltip = d3.select("body")
        	.append("div")
          	// .style("position", "absolute")
          	// .style("z-index", "10")
          	.style("visibility", "hidden")
            .attr("class", "tooltip")

         var node = graph.select('.flagbox').selectAll("img")
           .data(force.nodes())
           .enter().append("img")
          //  .attr("class", "node")
           .attr("class", function (d) {
             return "flag" + " flag-" + d.code;
           })
           .on("mouseover", function (d) {
             tooltip.style("visibility", "visible")
             tooltip.html("<span>" + d.country + "</span>")
           })
          	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


       node.append("title")
           .text(function(d) { return d.country; });


       function tick(e) {

         node.attr('cx', function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
             .attr('cy', function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); })
             .call(force.drag)

         node.style('left', d => (d.x - 8) + "px")
         .style('top', d => (d.y - 5) + "px");

         link.attr('x1', function(d) { return d.source.x; })
             .attr('y1', function(d) { return d.source.y; })
             .attr('x2', function(d) { return d.target.x; })
             .attr('y2', function(d) { return d.target.y; });

     }

   });

 });
