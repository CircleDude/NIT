// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {  
  
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Максимальная скорость']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ
    const keyX = dataForm.elements.OX_value.value;
        
    // создаем массив для построения графика
    // let arrGraph = createArrGraph(data, keyX).sort();
    let arrGraph = createArrGraph(data, keyX);
    if (keyX === "Год") arrGraph = arrGraph.sort((a,b) => a.labelX - b.labelX);
    
    const svg = d3.select("svg")  
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }
       
    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, (dataForm.maxHeight.checked) ? 1 : 0);
    
    // рисуем график
    if (dataForm.minHeight.checked) {
        createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0, dataForm.graphType.value);
    }
    if (dataForm.maxHeight.checked) {
        createChart(svg, arrGraph, scX, scY, attr_area, "red", 1, dataForm.graphType.value);
    }
}

function createAxis(svg, data, attr_area, valuesIndex){
    // находим интервал значений, которые нужно отложить по оси OY 
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const [min, max] = d3.extent(data.map(d => d.values[valuesIndex]));

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX))
                    .range([0, attr_area.width - 2 * attr_area.marginX]);
                    
    const scaleY = d3.scaleLinear()
                    .domain([min * 0.8, max * 1.1 ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);               
     
    // создание осей
    const axisX = d3.axisBottom(scaleX); // горизонтальная 
    const axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                        ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, valuesIndex, type) {
    switch (type) {
        case 'dots':
            const r = 4;
            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", r)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[valuesIndex]) - valuesIndex*2)
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", color);
        break;
        case 'rects':
            let width = scaleX.bandwidth() * 0.2;

            svg.selectAll(".rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - width * (1-valuesIndex))
                .attr("y", d => scaleY(d.values[valuesIndex]))
                .attr("width", width)
                .attr("height", d => attr_area.height - attr_area.marginY * 2 - scaleY(d.values[valuesIndex]))
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", color);
        break;
        case 'graph':
            const lineGenerator = d3.line()
                .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .y(d => scaleY(d.values[valuesIndex]))
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", 2)
                .attr("d", lineGenerator)
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);

            const r2 = 4;
            svg.selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", r2)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values[valuesIndex]) - valuesIndex*2)
                .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
                .style("fill", color);
        break;
    }
}