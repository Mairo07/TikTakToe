let currentValue

let rootElement = window.document.getElementById("root")



let state = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


for (let i = 0; i < state.length; i++) {
    let rowElement = window.document.createElement("div");
    rowElement.classList.add("row");
    rootElement.appendChild(rowElement)

    for (let j = 0; j < state[i].length; j++) {
        rowElement.appendChild(createOutline(i, j))
    }
}

    // 0[0, 1, 2],
    // 1[0, 1, 2],
    // 2[0, 1, 2],


function checkState() {
      
    if ((state[0][0] == state[0][1]) && (state[0][1] == state[0][2]) && (state[0][0] != null)
    || (state[1][0] == state[1][1]) && (state[1][1] == state[1][2]) && (state[1][0] != null) 
    || (state[2][0] == state[2][1]) && (state[2][1] == state[2][2]) && (state[2][0] != null) 
    || (state[0][0] == state[1][0]) && (state[1][0] == state[2][0]) && (state[0][0] != null) 
    || (state[0][1] == state[1][1]) && (state[1][1] == state[2][1]) && (state[0][1] != null) 
    || (state[0][2] == state[1][2]) && (state[1][2] == state[2][2]) && (state[0][2] != null) 
    || (state[0][0] == state[1][1]) && (state[1][1] == state[2][2]) && (state[0][0] != null) 
    || (state[0][2] == state[1][1]) && (state[1][1] == state[2][0]) && (state[0][2] != null)) {
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

    if (x == 1 && y == 1) {
        squardElement.click()
    }
    
    return squardElement
}

