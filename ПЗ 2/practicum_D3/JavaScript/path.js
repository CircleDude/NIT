function createPathSaw() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")
    let data = [];
    
    for (let t = height - 50; t >= 50; t -= 0.1) {
        data.push(
            {x: width / 2 + (-90) * Math.abs(Math.sin(t/30)),
             y: t}
        );
    }
    return data;
}

const drawPath = () => {
	const dataPoints = createPathSaw();

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		// .attr('stroke', 'none')
		.attr('stroke', 'red')
		.attr('fill', 'none');
		
	return path;
}

function translateAlong(path, dataForm) {
    const length = path.getTotalLength();

    return function() {

            let sclxIntrpl = d3.interpolate(dataForm.sclx.value, dataForm.sclx_finish.value);
            let sclyIntrpl = d3.interpolate(dataForm.scly.value, dataForm.scly_finish.value);
            let rotIntrpl = d3.interpolate(dataForm.rot.value, dataForm.rot_finish.value);

            return function (t) {
                let p = path.getPointAtLength(t * length);

                let sclx = sclxIntrpl(t);
                let scly = sclyIntrpl(t);
                let rot = rotIntrpl(t);

                d3.select(this).attr("transform", `
                    translate(${p.x}, ${p.y})
                    scale(${sclx}, ${scly})
                    rotate(${rot})
                `);
            };
        }
}