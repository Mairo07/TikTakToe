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

function getWinnerItems(state, type, index) {
    let result = true
    let winnerItems = []
    let compareItem

    if (type === "diagonal1") {
        compareItem = state[0][0]
    } else if (type === "diagonal2") {
        compareItem = state[state.length - 1][0]
    } else if (type === "row") {
        compareItem = state[index][0]
    } else if (type === "colum") {
        compareItem = state[0][index]
    }

    for (let i = 0; i < state.length; i++) {
        if (type === "diagonal1") {
            result = compareItem === state[i][i]
        } else if (type === "diagonal2") {
            result = compareItem === state[i][state.length - 1 - i]
        } else if (type === "row") {
            result = compareItem === state[index][i] 
        } else if (type === "colum") {
            result = compareItem === state[i][index]
        }
        
        if (result === false) {
            winnerItems = []
            break
        } else { 
            if (type === "diagonal1") {
                winnerItems.push([i, i])
            } else if (type === "diagonal2") {
                winnerItems.push([i, state.length - 1 - i])
            } else if (type === "row") {
                winnerItems.push([index, i])
            } else if (type === "colum") {
                winnerItems.push([i, index])
            }
        }
        
    }

    if ((compareItem !== null) && (result === true)) {
    
        return winnerItems
    } 

    return []
    
}




function getFindWinning() { 
    let winnerItems = []

    winnerItems = getWinnerItems(state, "diagonal1")
    if (winnerItems.length > 0 ) {
        return winnerItems
    }

    winnerItems = getWinnerItems(state, "diagonal2")
    if (winnerItems.length > 0) {
        return winnerItems
    }

    for (let i = 0; i < state.length; i++) {

        winnerItems = getWinnerItems(state, "row", i)
        if (winnerItems.length > 0) {
            return winnerItems
        }

        winnerItems = getWinnerItems(state, "colum", i)
        if (winnerItems.length > 0) {
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

