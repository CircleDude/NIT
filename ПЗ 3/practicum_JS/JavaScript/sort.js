/*формируем массив для сортировки по двум уровням вида 
  [
    {column: номер столбца, по которому осуществляется сортировка, 
     direction: порядок сортировки (true по убыванию, false по возрастанию)
    }, 
    ...
   ]
*/
const createSortArr = (data) => {
    let sortArr = [];
    
    const sortSelects = data.getElementsByTagName('select');
    
    for (const item of sortSelects) {   
       // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        // очередной элемент массива - по какому столбцу и в каком порядке сортировать 
        sortArr.push(
          {column: keySort - 1, 
           direction: desc}
        ); 
    }
    return sortArr; 
};

const sortTable = (idTable, formData) => {
    
    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        filterTable(cars, "list", document.getElementById("filter"));

        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
     const headerRow = rowData.shift();

     const numCols = [4, 5];
    
    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;

            // // используем localeCompare для корректного сравнения
            // const comparison = (typeof firstCell == 'number' && typeof secondCell == 'number') ?
            //     firstCell < secondCell : firstCell.localeCompare(secondCell);
            let comparison;

            if (numCols.includes(column)) {
                comparison = Number(firstCell) - Number(secondCell);
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }
                
            // учитываем направление сортировки
            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }
        return 0;
    });
    
    //выводим отсортированную таблицу на страницу
    table.append(headerRow);
	
	let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
	table.append(tbody);
}

const clearSort = (idTable, formData) => {
    for(const item of formData.elements){
        if (item.tagName === "SELECT") item.value = 0;
        else if (item.type === "checkbox") item.checked = false;
    }
    changeNextSelect(document.getElementById('fieldsFirst'), 'fieldsSecond');
    changeNextSelect(document.getElementById('fieldsSecond'), 'fieldsThird');
    sortTable('list', document.getElementById('sort'));
}