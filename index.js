let currentValue

let rootElement = window.document.getElementById("root")

let state = [
    [null, null, null,],
    [null, null, null,],
    [null, null, null,],
]

// 0[0, 1, 2],
// 1[0, 1, 2],
// 2[0, 1, 2],

for (let i = 0; i < state.length; i++) {
    let rowElement = window.document.createElement("div");
    rowElement.classList.add("row");
    rootElement.appendChild(rowElement)

    for (let j = 0; j < state[i].length; j++) {
        rowElement.appendChild(createOutline(j, i))
    }
}

function isX(element) {
    return element == "X"
}

function isO(element) {
    return element == "O"
}


function findWinning() {
    let diagonalResult = true
    
    for (let i = 0; i < state.length; i++) {
        diagonalResult = state[0][0] === state[i][i]
        
        if (diagonalResult === false) {
            break
        }
        
    }
    if ((state[0][0] !== null) && (diagonalResult === true)) {
        alert("win" + " " + state[0][0])
        return 
    } 
   
    for (let i = 0; i < state.length; i++) {
        diagonalResult = state[state.length - 1][0] === state[i][state.length - 1 - i]
        
        if (diagonalResult === false) {
            break
        }

    }   
    if ((state[state.length - 1][0] !== null) && (diagonalResult === true)) {
        alert("win" + " " + state[state.length - 1][0])
        return 
    } 

    for (let i = 0; i < state.length; i++) {
        let result = true
                        
        for (let k = 1; k < state.length; k++) {
            result = state[0][i] === state[k][i]

            if (result === false) {
                break
            }

        }
        if ((state[0][i] !== null) && (result === true)) {
            alert("win" + " " + state[0][i])
            return 
        } 

        for (let j = 1; j < state[i].length; j++) {                 
            result = state[i][0] === state[i][j]

            if (result === false) {
                break
            }
            
        }
         if ((state[i][0] !== null) && (result === true)) {
            alert("win" + " " + state[i][0])
            return 
        } 
        
    }

}
       
/*
function findWinning() {
    for (let i = 0; i < state.length; i++) {

        if (state[i].every(isX)) {
            alert("X WIN!")
        } else if (state[i].every(isO)) {
            alert("O WIN!")
        } else if ((state[0][i] == "X") && (state[1][i] == "X") && (state[2][i] == "X")) {
            alert("X WIN!")
        } else if ((state[0][i] == "O") && (state[1][i] == "O") && (state[2][i] == "O")) {
            alert("O WIN!")
        }


    
    }
    
}
*/


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
        setTimeout(findWinning, 0)
        
    })

    if (x == 1 && y == 1) {
        squardElement.click()
    }
    
    return squardElement
}

