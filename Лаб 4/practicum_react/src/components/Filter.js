/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
			
    const handleSubmit= (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы
		const filterField = {
			"Название": event.target["structure"].value.toLowerCase(),
		    "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Высота": [event.target["heightFrom"].value, event.target["heightTo"].value]
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in  filterField) {
			arr = arr.filter(item => {
			    if (['Год', 'Высота'].includes(key)) {
                    let a = (filterField[key][0]) ? filterField[key][0] : -Infinity; 
                    let b = (filterField[key][1]) ? filterField[key][1] : Infinity; 
                    return a <= item[key] && item[key] <= b;
                } else {
                    return item[key].toLowerCase().includes(filterField[key]);  
                } 
            });
        }  
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
        props.sapn();
	}

    const handleReset = (event) => {
        setTimeout(() => {
            handleSubmit(event);
        }, 0);
    }

   return (
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Название: </label>
                <input name="structure" type="text" />
            </p>  
            <p>
                <label>Тип: </label>		
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна: </label>		
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город: </label>		
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год: от </label>		
                <input name="yearFrom" type="number" />
                <label> до </label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Высота: от </label>		
                <input name="heightFrom" type="number" />
                <label> до </label>
                <input name="heightTo" type="number" />
            </p>
            <p>         
                <button type="submit">Фильтровать</button>   
                <button type="reset">Очистить фильтр</button>
            </p>  
        </form>
    )
}

export default Filter;