import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);
    const [type, setType] = useState("dots");

    const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Максимальная скорость']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }
        if (key === 'Год') arrGraph = arrGraph.sort((a,b) => a.labelX - b.labelX);
        return arrGraph;
    }

    const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value); 
		setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);		
        setType(event.target["graphType"].value);
	}

    return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit }>
        <p> Значение по оси OX: </p>
		<div>
          <label>
            <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" } />
            Страна
		  </label>
		  <br/>
          <label>
            <input type="radio" name="ox" value="Год" defaultChecked={ oy[0] === true } />
            Год
          </label>
		</div>

        <p className={(oy[0] | oy[1]) ? "" : "errorText"}> Значение по оси OY </p>
		<div>
          <label>
            <input type="checkbox" name="oy" />
            Максимальная скорость
          </label>
          <br/>
          <label>
            <input  type="checkbox" name="oy" />
            Минимальная скорость
          </label>
		</div>

        <p>
          <label>Тип графика: </label>
          <select name="graphType">
            <option value="dots">Точечная диаграмма</option>
            <option value="rects">Гисторамма</option>
          </select>
        </p>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>    
      <ChartDraw data={ createArrGraph(props.data, ox) } oy={ oy } type={ type } />
	</>
    )
}

export default Chart;