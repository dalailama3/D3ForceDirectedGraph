$("document").ready(function () {
  $.ajax({
    url: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
    dataType: "json"
  }).done(function (data) {
      var links = data.links
      var nodes = data.nodes

      var width = 900
      var height = 700
      const forceCharge = -100;
      const linkDistance = 50;

      var force = d3.layout.force()
         .size([width, height])
         .nodes(nodes) //add nodes
         .links(links) //add links
         .on("tick", tick)
         .linkDistance(linkDistance)
         .charge(forceCharge)
         .start();

      var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)

        var link = svg.append("g")
         .attr("class", "links")
         .selectAll("line")
         .data(links)
         .enter().append("line")
         .attr("stroke-width", "2px")



         var node = svg.selectAll('.node')
         .data(force.nodes())
         .enter().append('circle')
         .attr('class', 'node')
         .attr('r', 5);

       node.append("title")
           .text(function(d) { return d.country; });

       function tick(e) {

         node.attr('cx', function(d) { return d.x; })
             .attr('cy', function(d) { return d.y; })
             .call(force.drag);

         link.attr('x1', function(d) { return d.source.x; })
             .attr('y1', function(d) { return d.source.y; })
             .attr('x2', function(d) { return d.target.x; })
             .attr('y2', function(d) { return d.target.y; });

     }
   });
 });
