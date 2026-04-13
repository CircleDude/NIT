document.addEventListener("DOMContentLoaded", function() {
    createTable(cars, 'list');
    document.getElementById("find").addEventListener("click", function () {
        clearSort('list', document.getElementById('sort'));
        filterTable(cars, "list", document.getElementById("filter"));
    });
    document.getElementById("clear").addEventListener("click", function () {
        clearSort('list', document.getElementById('sort'));
        clearFilter(cars, "list", document.getElementById("filter"));
    });
    setSortSelects(cars[0], document.getElementById('sort'));
    document.getElementById('fieldsFirst').addEventListener("change", function () {
        changeNextSelect(document.getElementById('fieldsFirst'), 'fieldsSecond');
        changeNextSelect(document.getElementById('fieldsSecond'), 'fieldsThird');
    });
    document.getElementById('fieldsSecond').addEventListener("change", function () {
        changeNextSelect(document.getElementById('fieldsSecond'), 'fieldsThird');
    });
    document.getElementById("sortButton").addEventListener("click", function () {
        sortTable('list', document.getElementById('sort'));
    });
    document.getElementById("clearSortButton").addEventListener("click", function () {
        clearSort('list', document.getElementById('sort'));
    });


    const dataForm = d3.select('#setting').node();

    d3.select('#toggleTable').on('click', toggleTableHide);
    d3.select('#plotGraph').on('click', () => {plotGraph(dataForm)});

    d3.select('#maxHeight').on('change', () => {removeTextError('titleOY')});
    d3.select('#minHeight').on('change', () => {removeTextError('titleOY')});

})

// формирование полей элемента списка с заданным текстом и значением

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select

const setSortSelect = (arr, sortSelect) => {
    
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем массив со значениями опций
     arr.forEach((item, index) => {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(item, index + 1));
    });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => { 

    // выделяем ключи словаря в массив
    const head = Object.keys(data);

    // находим все SELECT в форме
    const allSelect = dataForm.getElementsByTagName('select');
    
    for(const item of dataForm.elements){
        // формируем очередной SELECT
        setSortSelect(head, item);
		
        // САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
        if (item !== dataForm.elements[0] && item.tagName === "SELECT") item.disabled = true;
    }
}

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
        // nextSelect.remove(curSelect.value);
        for (let option of nextSelect.options) {
            if (option.value === curSelect.value) {
                option.remove();
            }
        }
    } else {
        nextSelect.disabled = true;
    }
}


function toggleTableHide() {
    d3.select('#toggleTable').node().value =
        ( d3.select('#list').node().classList.toggle('hidden') ) ?
        "Показать таблицу" : "Скрыть таблицу";
}

function plotGraph(dataForm) {
    if (dataForm.maxHeight.checked || dataForm.minHeight.checked) {
        drawGraph(curData, dataForm);
    } else {
        d3.select('#titleOY').node().classList.add('errorText');
    }
}

function removeTextError(nodeID) {
    d3.select('#'+nodeID).node().classList.remove('errorText');
}