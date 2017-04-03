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

        var svg = graph.append("svg")
          .attr("width", width)
          .attr("height", height)


        var link = svg.selectAll('.link')
          .data(data.links)
          .enter()
          .append('line')
          .attr('class', 'link');



         var node = graph.select('.flagbox').selectAll("img")
           .data(force.nodes())
           .enter().append("img")
          //  .attr("class", "node")
           .attr("class", function (d) {
             return "flag" + " flag-" + d.code;
           })

        //  .attr('r', function (d) {
        //    return d.weight/5 * 6;
        //  })

       node.append("title")
           .text(function(d) { return d.country; });

      //  var images = node.append("svg:image")
       //
      //  .attr("xlink:href",  "./flags.png")
      //   .attr("class", function (d) {
      //     return "node flag" + " flag-" + d.code;
      //   })
      //  .attr("x", function(d) { return -25;})
      //  .attr("y", function(d) { return -25;})
      //  .attr("height", 11)
      //  .attr("width", 16);


       function tick(e) {

         node.attr('cx', function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
             .attr('cy', function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); })
             .call(force.drag);

         node.style('left', d => (d.x - 8) + "px")
         .style('top', d => (d.y - 5) + "px");

         link.attr('x1', function(d) { return d.source.x; })
             .attr('y1', function(d) { return d.source.y; })
             .attr('x2', function(d) { return d.target.x; })
             .attr('y2', function(d) { return d.target.y; });

     }

   });

 });
