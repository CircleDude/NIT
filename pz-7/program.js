let myRound = (number, digits = 3) => (Math.round( number * 10**digits )) / 10**digits;


function calculate(data) {


    let inp1 = data.input1.value;
    if (isNaN(inp1) || Number(inp1) <= 0) {
        data.input1.classList.add("errorBorder");
        return false;
    }

    let inp2 = data.input2.value;
    if ( isNaN(inp2) || Number(inp2) <= 0 || (data.querySelector("#inputSelect").value === "side-angle" && Number(inp2) >= 90) ) {
        data.input2.classList.add("errorBorder");
        return false;
    }

    if (data.select.selectedIndex == -1) {
        data.querySelector("#task").classList.add('errorText');
        return false;
    }

    let output = data.querySelector('#output');
    output.innerHTML = "<p>Результат:</p>";
    
    let mode = data.querySelector("#inputSelect").value;
    let a, h, S, P, r;

    if (mode === "diagonals") {

        S = (inp1 * inp2) / 2;
        a = 0.5 * Math.sqrt(inp1**2 + inp2**2);
        P = 4 * a;
        h = S / a;
        r = S / (P / 2);
    }

    if (mode === "side-angle") {

        let angle = inp2 * Math.PI / 180;
        a = inp1;

        S = a**2 * Math.sin(angle);
        h = a * Math.sin(angle);
        P = 4 * a;
        r = S / (P / 2);
    }

    for (let option of data.querySelector('#select').options) {

        if (!option.selected) continue;

        let p = document.createElement("p");

        if (option.value == "0") p.innerHTML = "Высота = " + myRound(h);
        if (option.value == "1") p.innerHTML = "Периметр = " + myRound(P);
        if (option.value == "2") p.innerHTML = "Радиус вписанной окружности = " + myRound(r);
        if (option.value == "3") p.innerHTML = "Площадь = " + myRound(S);

        output.appendChild(p);
    }

    return true;
}


function clearData(data) {
    data.querySelectorAll('input[type="number"]').forEach( (input) => {
        input.value = '';
        input.classList.remove('errorBorder');
    });
    data.querySelector('#select').selectedIndex = -1;
    data.querySelector('#task').classList.remove('errorText');
    data.querySelector('#output').innerHTML = "";
}


function show(data) {
    clearData(data);
    
    let select = data.querySelector("#inputSelect").value;
    let image = data.previousElementSibling;
    
    let label1 = data.querySelector("#label1");
    let label2 = data.querySelector("#label2");

    if (select === "diagonals") {
        image.src = "images/img1.png";
        label1.innerHTML = "d<sub>1</sub>";
        label2.innerHTML = "d<sub>2</sub>";
    }
    else if (select === "side-angle") {
        image.src = "images/img2.png";
        label1.textContent = "a";
        label2.textContent = "β";
    }
}


document.getElementById("calcBtn").addEventListener("click", function () {
    calculate(this.form);
});

document.getElementById("clearBtn").addEventListener("click", function () {
    clearData(this.form);
});

document.querySelectorAll('input[type="number"]').forEach( (input) => {
    input.onfocus = function() {
        this.classList.remove('errorBorder');
        this.form.querySelector('#output').innerHTML = "";
    };
});

document.querySelectorAll('input[type="checkbox"]').forEach( (cb) => {
    cb.addEventListener('change', (event) => document.getElementById('task').classList.remove('errorText'));
});

document.getElementById('select').addEventListener('change', (event) => {
    document.getElementById('task').classList.remove('errorText');
});
