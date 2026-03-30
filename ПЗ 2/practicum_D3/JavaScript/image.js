// создаем изображение смайлик
// рисуем его относительно точки (0, 0)
function drawSmile(svg) {
    let smile = svg.append("g")
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "brown");
    //лицо
    smile.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "yellow");
    //левый глаз   
    smile.append("circle") 
        .attr("cx", -20)
        .attr("cy", -10)
        .attr("r", 5);
    //правый глаз
    smile.append("circle") 
        .attr("cx", 20)
        .attr("cy", -10)
        .attr("r", 5);
    // улыбка
    let arc = d3.arc()
       .innerRadius(35)
       .outerRadius(35);    
    smile.append("path")
       .attr("d", arc({startAngle: Math.PI /3 * 2, endAngle: Math.PI/3 * 4}))
       .style("stroke", "brown")

     return smile  
}   

function drawOfficeChair(svg) {
    let chair = svg.append("g")
        .style("stroke-width", 2)
        .style("fill", "brown");

    // chair.append("rect")
    //     .style("x", -50)
    //     .style("y", -50)
    //     .style("width", 100)
    //     .style("height", 100)
    //     .style("fill", "none")
    //     .style("stroke", "red");

    chair.append("circle")
        .attr("cx", 0)
        .attr("cy", 36)
        .style("fill", "none")
        .style("stroke-width", 7)
        .style("stroke", "grey")
        .attr("r", 7);

    chair.append("circle")
        .attr("cx", -30)
        .attr("cy", 30)
        .style("fill", "none")
        .style("stroke-width", 7)
        .style("stroke", "grey")
        .attr("r", 7);

    chair.append("circle")
        .attr("cx", 30)
        .attr("cy", 30)
        .style("fill", "none")
        .style("stroke-width", 7)
        .style("stroke", "grey")
        .attr("r", 7);

    chair.append("line")
        .attr("x1", 0)
        .attr("y1", 22)
        .attr("x2", 0)
        .attr("y2", -7)
        .style("stroke-width", 7)
        .style("stroke", "grey");

    chair.append("line")
        .attr("x1", 0)
        .attr("y1", 5)
        .attr("x2", -30)
        .attr("y2", 13)
        .style("stroke-width", 7)
        .style("stroke", "grey");

    chair.append("line")
        .attr("x1", 0)
        .attr("y1", 5)
        .attr("x2", 30)
        .attr("y2", 13)
        .style("stroke-width", 7)
        .style("stroke", "grey");

    chair.append("line")
        .attr("x1", -27)
        .attr("y1", -7)
        .attr("x2", 27)
        .attr("y2", -7)
        .style("stroke-width", 7)
        .style("stroke", "grey");

    chair.append("line")
        .attr("x1", -23)
        .attr("y1", -7)
        .attr("x2", -30)
        .attr("y2", -50)
        .style("stroke-width", 7)
        .style("stroke", "grey");

    return chair;
}