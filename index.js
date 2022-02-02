let currentValue

let rootElement = window.document.getElementById("root")

let state = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function handleLeftClick(element) {

    if ((element.innerText == "") && (currentValue == "X")) {
        element.innerText = "O"
        currentValue = "O"
    } else if (element.innerText == "") {
        element.innerText = "X"
        currentValue = "X"
    }

    return currentValue
}

function createOutline(x, y) {
    let squardElement = window.document.createElement("div");
    squardElement.classList.add("outline");
    squardElement.addEventListener("click", function (event) {
        state[y][x] = handleLeftClick(squardElement)
        console.log(state)
    })
    
    return squardElement
}

function createRow(y) {
    let rowElement = window.document.createElement("div");
    rowElement.classList.add("row");    
    rowElement.appendChild(createOutline(0, y));
    rowElement.appendChild(createOutline(1, y));
    rowElement.appendChild(createOutline(2, y));

    return rowElement
}

rootElement.appendChild(createRow(0));
rootElement.appendChild(createRow(1));
rootElement.appendChild(createRow(2));



