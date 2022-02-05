let currentValue

let rootElement = window.document.getElementById("root")

let state = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]



    // 0[0, 1, 2],
    // 1[0, 1, 2],
    // 2[0, 1, 2],





function checkState() {
    let result = false


    if ((state[0][0] == state[0][1]) && (state[0][1] == state[0][2]) && (state[0][0] != null)) {
        result = true
    } else if ((state[1][0] == state[1][1]) && (state[1][1] == state[1][2]) && (state[1][0] != null)) {
        result = true
    } else if ((state[2][0] == state[2][1]) && (state[2][1] == state[2][2]) && (state[2][0] != null)) {
        result = true
    } else if ((state[0][0] == state[1][0]) && (state[1][0] == state[2][0]) && (state[0][0] != null)) {
        result = true
    } else if ((state[0][1] == state[1][1]) && (state[1][1] == state[2][1]) && (state[0][1] != null)) {
        result = true 
    } else if ((state[0][2] == state[1][2]) && (state[1][2] == state[2][2]) && (state[0][2] != null)) {
        result = true
    } else if ((state[0][0] == state[1][1]) && (state[1][1] == state[2][2]) && (state[0][0] != null)) {
        result = true
    } else if ((state[0][2] == state[1][1]) && (state[1][1] == state[2][1]) && (state[0][2] != null)) {
        result = true
    } 
    
      
    if (result == true) {
        alert("WIN!")
    } 
}


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
        setTimeout(checkState, 0)
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



