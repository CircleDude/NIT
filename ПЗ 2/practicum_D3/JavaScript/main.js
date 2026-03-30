document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const dataForm = d3.select('#setting').node();

    d3.select('#clear').on('click', clear);
    d3.select('#animate').on('click', () => runAnimation(dataForm));
})

const clear = () => d3.select("svg").selectAll('*').remove();

const runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawOfficeChair(svg);
    let path = drawPath();

    pict.transition()
        .duration(dataForm.speed.value)
        .ease(d3.easeLinear)
        .tween("hipHop", translateAlong(path.node(), dataForm));
}
