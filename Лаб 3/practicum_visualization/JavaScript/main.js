document.addEventListener("DOMContentLoaded", function() {
    const dataForm = d3.select('#setting').node();

    showTable('build', buildings);
    
    d3.select('#toggleTable').on('click', toggleTableHide);
    d3.select('#plotGraph').on('click', () => {plotGraph(dataForm)});

    d3.select('#maxHeight').on('change', () => {removeTextError('titleOY')});
    d3.select('#minHeight').on('change', () => {removeTextError('titleOY')});
})

function toggleTableHide() {
    d3.select('#toggleTable').node().value =
        ( d3.select('#build').node().classList.toggle('hidden') ) ?
        "Показать таблицу" : "Скрыть таблицу";
}

function plotGraph(dataForm) {
    if (dataForm.maxHeight.checked || dataForm.minHeight.checked) {
        drawGraph(buildings, dataForm);
    } else {
        d3.select('#titleOY').node().classList.add('errorText');
    }
}

function removeTextError(nodeID) {
    d3.select('#'+nodeID).node().classList.remove('errorText');
}