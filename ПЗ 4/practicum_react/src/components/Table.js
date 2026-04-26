import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => setDataTable(value);
    
    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows); 

    const [activePage, setActivePage] = useState(n);
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    let pages = [];
    
    if (props.pagination == true) {
        pages = arr.map((item, index) =>  
            <span key={ index }
            className={(index+1 == activePage) ? 'currentPage' : ''}
            onClick={ changeActive }>
                { item }
            </span>
        );
    }

    return( 
      <>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data } sapn={ () => setActivePage(n) }/>

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable }
                amountRows={ props.amountRows }
                numPage={ activePage }
                pagination={ props.pagination }/>
        </table>

	    <div>
          {pages}
        </div>
	  </>   
    )   
}

export default Table;