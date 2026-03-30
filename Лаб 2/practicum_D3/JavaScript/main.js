document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const dataForm = document.getElementById("setting");

    // let pict = drawSmile(svg);
    // pict.attr("transform", "translate(200, 200)");

    // let pict1 = drawSmile(svg); 
    // pict1.attr("transform", `translate(400, 400) scale(1.5, 1.5) rotate(180)`);

    document.getElementById("draw").addEventListener("click", function () {
        draw(dataForm);
    });
    document.getElementById("clear").addEventListener("click", function () {
        clear();
    });

    modeInitiallization(dataForm);

    document.getElementById('animation').addEventListener("change", function () {
        if (!dataForm.animation.checked && dataForm.movementAlongPath.checked) {
            dataForm.movementAlongPath.checked = false;
            toggleMovementAlongPath(dataForm);
        }
        toggleAnimation(dataForm);
    });
    document.getElementById('movementAlongPath').addEventListener("change", function () {
        toggleMovementAlongPath(dataForm);
    });
    document.getElementById("animate").addEventListener("click", function () {
        runAnimation(dataForm);
    });
})

const draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value})
                            scale(${dataForm.sclx.value},
                                  ${dataForm.scly.value})
                            rotate(${dataForm.rot.value})`);
}

const clear = (dataForm) => {
	const svg = d3.select("svg")
    svg.selectAll('*').remove();
}

const runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg);
    let easeType;
    
    switch (dataForm.animType.value) {
        case 'linear':
            easeType = d3.easeLinear;
            break;
        case 'elastic':
            easeType = d3.easeElastic;
            break;
        case 'bounce':
            easeType = d3.easeBounce;
            break;
    }

    if (dataForm.movementAlongPath.checked === false) {
        pict.attr("transform", `translate(${dataForm.cx.value},
                                          ${dataForm.cy.value})
                                scale(${dataForm.sclx.value},
                                      ${dataForm.scly.value})
                                rotate(${dataForm.rot.value})`)
        .transition()
        .duration(6000)
        .ease(easeType)
        .attr("transform", `translate(${dataForm.cx_finish.value},
                                          ${dataForm.cy_finish.value})
                                scale(${dataForm.sclx_finish.value},
                                      ${dataForm.scly_finish.value})
                                rotate(${dataForm.rot_finish.value})`);
    } else {
        let path = drawPath(dataForm.movementAlongPathType.selectedIndex/* номер опции из поля со списком с путями */);	
		pict.transition()
        .ease(easeType) // установить в зависимости от настроек формы
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
    }
}

const modeInitiallization = (dataForm) => {
    document.querySelectorAll('[id$="finish"]').forEach( (el) => {
        el.classList.toggle('hidden');
        el.labels[0].classList.toggle('hidden');    
    });
    dataForm.animType.classList.toggle('hidden');
    dataForm.animate.classList.toggle('hidden');
    document.getElementById('movementAlongPathTypeSelect').classList.toggle('hidden');
    document.getElementById('movementAlongPathQuestion').classList.toggle('hidden');
}

const toggleAnimation = (dataForm) => {
    document.querySelectorAll('[id$="finish"]').forEach( (el) => {
        el.classList.toggle('hidden');
        el.labels[0].classList.toggle('hidden');    
    });
    dataForm.animType.classList.toggle('hidden');
    dataForm.animate.classList.toggle('hidden');
    dataForm.draw.classList.toggle('hidden');
    document.getElementById('movementAlongPathQuestion').classList.toggle('hidden');
}

const toggleMovementAlongPath = (dataForm) => {
    document.getElementById('coordinates').classList.toggle('hidden');
    document.getElementById('scale').classList.toggle('hidden');
    document.getElementById('rotation').classList.toggle('hidden');
    document.getElementById('movementAlongPathTypeSelect').classList.toggle('hidden');
}