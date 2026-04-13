import TableHead from './TableHead.js';
import TableBody from './TableBody.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
	
	//количество страниц разбиения таблицы
    const n = Math.ceil(props.data.length / props.amountRows); 
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    let curPage = 3;
    const pages = arr.map((item, index) =>  
        <span key={ index } className={(index+1 === curPage) ? 'currentPage' : ''}> { item } </span>
    );

    return( 
      <>
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ props.data } amountRows={ props.amountRows } numPage={curPage}/>
        </table>

	    <div>
          {pages}
        </div>
	  </>   
    )   
}

export default Table;