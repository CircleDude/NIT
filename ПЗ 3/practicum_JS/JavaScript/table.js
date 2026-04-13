let curData = [];

const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    const header = Object.keys(data[0]);

    /* создание шапки таблицы */
    const headerRow = createHeaderRow(header);
    table.append(headerRow);

    /* создание тела таблицы */
    const bodyRows = createBodyRows(data);
    table.append(bodyRows);

    curData = data;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');
    
    data.forEach( building => {
        const tr = document.createElement('tr');
        for(let key in building) {
            const td = document.createElement('td');
            td.innerHTML = building[key];
            tr.append(td);
        }
        tbody.append(tr);
    });

    return tbody;
}

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const clearTable = (idTable) => {
    document.getElementById(idTable).innerHTML = '';
}

const clearRows = (idTable) => {
    document.getElementById(idTable).getElementsByTagName('tbody')[0].innerHTML = '';
}