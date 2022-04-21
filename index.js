let rootElement = window.document.getElementById("root")





let state = [
    [null, "X", null],
    [null, null, null],
    [null, null, null],
]

// 0[0, 1, 2],[]
// 1[0, 1, 2],
// 2[0, 1, 2],

// let winnerItems = [[0,0],[1,1],[2,2]]


function findWinnerItem(items, y, x) {

    function findWinerElement(item) {
        if ((item[0] === y)&&(item[1] === x)) {
            return true
        }
    }

    return items.find(findWinerElement) 

}



function render(state, item) {
    rootElement.textContent = ""
    for (let i = 0; i < state.length; i++) {
        let rowElement = window.document.createElement("div");
        rowElement.classList.add("row");
        rootElement.appendChild(rowElement)
    
        for (let j = 0; j < state[i].length; j++) {
            let element = createOutline(i, j)
            rowElement.appendChild(element)

            if (state[i][j] === "X") {
                element.innerText = "X"
            } else if (state[i][j] === "O") {
                element.innerText = "O"
            }
                      
            if (findWinnerItem(item, i, j)) {
                element.classList.add("winnerItems")
            }
            
        }
    }

}


function getFindWinning() { 
    let diagonalResult = true
    let winnerItems = []
    
    for (let i = 0; i < state.length; i++) {
        diagonalResult = state[0][0] === state[i][i]
        
        if (diagonalResult === false) {
            winnerItems = []
            break
        } else { 
            winnerItems.push([i, i])
        }
        
    }
    if ((state[0][0] !== null) && (diagonalResult === true)) {
        
        return winnerItems
    } 
   
    for (let i = 0; i < state.length; i++) {
        diagonalResult = state[state.length - 1][0] === state[i][state.length - 1 - i]
        
        if (diagonalResult === false) {
            winnerItems = []
            break
        } else {
            winnerItems.push([i, state.length - 1 - i])
        }

    }   
    if ((state[state.length - 1][0] !== null) && (diagonalResult === true)) {
        
        return winnerItems
    } 

    for (let i = 0; i < state.length; i++) {
        let result = true
                        
        for (let k = 0; k < state.length; k++) {
            result = state[0][i] === state[k][i]

            if (result === false) {
                winnerItems = []
                break
            } else {
                winnerItems.push([k, i])
            }

        }
        if ((state[0][i] !== null) && (result === true)) {
            
            return winnerItems
        } 

        for (let j = 0; j < state[i].length; j++) {                 
            result = state[i][0] === state[i][j]

            if (result === false) {
                winnerItems = []
                break
            } else {
                winnerItems.push([i, j])
            }
            
        }
         if ((state[i][0] !== null) && (result === true)) {
            
            return winnerItems
        } 
        
    }
return winnerItems = []
}
       


function getCurrentValue(state) {
    let currentValue
    let countOfX = 0
    let countOfO = 0
    for (let i = 0; i < state.length; i++) {
        
        for (let j = 0; j < state[i].length; j++) {

            if (state[i][j] === "X") {
                countOfX++
            } else if (state[i][j] === "O") {
                countOfO++
            } 
        } 
    }           
    
    if (countOfX > countOfO) {
        currentValue = "O"
    } else if (countOfX === countOfO) {
        currentValue = "X"
    }

    return currentValue
}

function createOutline(y, x) {
    let squardElement = window.document.createElement("div");
    squardElement.classList.add("outline");

    if (state[y][x] === null) {
        squardElement.addEventListener("click", function (event) {
            
            state[y][x] = getCurrentValue(state)
            let winnerItems = getFindWinning()
            render(state, winnerItems)
            setTimeout(getFindWinning, 0)
            
        })
    }
    
    return squardElement
}


render(state, [])

