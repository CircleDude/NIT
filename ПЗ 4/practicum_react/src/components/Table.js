import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState, useRef } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    
    const [filteredData, setFilteredData] = useState(props.data);
    const [sortedData, setSortedData] = useState(props.data);
    
    //количество страниц разбиения таблицы
    const n = Math.ceil(sortedData.length / props.amountRows);

    const [activePage, setActivePage] = useState(1);
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const sortResetRef = useRef(() => {});
    
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

    const handleFilter = (value) => {
        setFilteredData(value);
        setSortedData(value);
        setActivePage(1);
    };

    const handleSort = (value) => {
        setSortedData(value);
        setActivePage(1);
    };

    return( 
      <>
        <Filter filtering={ handleFilter } fullData={ props.data } onResetSort={() => sortResetRef.current()} />
        <Sort sorting={ handleSort } data={ filteredData } sortLevelsNum={ 3 } setSortReset={(fn) => { sortResetRef.current = fn; }} />

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ sortedData }
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