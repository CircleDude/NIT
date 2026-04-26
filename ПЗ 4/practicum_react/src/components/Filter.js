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
			"Производитель": event.target["manufacturer"].value.toLowerCase(),
		    "Название": event.target["name"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Год": [event.target["yearFrom"].value, event.target["yearTo"].value],
            "Максимальная скорость": [event.target["speedFrom"].value, event.target["speedTo"].value]
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in filterField) {
			arr = arr.filter(item => {
			    if (['Год', 'Максимальная скорость'].includes(key)) {
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
        <details>
        <summary>Фильтр</summary>
        <form id="filter" onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Производитель: </label>
                <input type="text" id="manufacturer" />
            </p>
            <p>
                <label>Название: </label>
                <input type="text" id="name" />
            </p>
            <p>
                <label>Страна: </label>
                <input type="text" id="country" />
            </p>
            <p>
                <label>Тип: </label>
                <input type="text" id="type" />
            </p>
            <p>
                <label>Год: от </label>
                <input type="number" id="yearFrom" />
                <label> до </label>
                <input type="number" id="yearTo" />
            </p>
            <p>
                <label>Максимальная скорость: от </label>
                <input type="number" id="speedFrom" />
                <label> до </label>
                <input type="number" id="speedTo" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>   
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
        <br />
        </details> 
    )
}

export default Filter;