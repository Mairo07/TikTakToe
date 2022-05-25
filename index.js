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
        if ((item[0] === y) && (item[1] === x)) {
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

function getResultDiagonal1(state, compareItem, i) {
     
    if ((compareItem !== null) && (compareItem === state[i][i])) {
        return [i, i]
    }

    return []
}

function getResultDiagonal2(state, compareItem, i) {
     
    if ((compareItem !== null) && (compareItem === state[i][state.length - 1 - i])) {
        return [i, state.length - 1 - i]
    }

    return []
}


function getHandleResultRow(index) {
     
    return (state, compareItem, i) => {
     
        if ((compareItem !== null) && (compareItem === state[index][i])) {
            return [index, i]
        }
    
        return []
    }   
}

function getHandleResultColum(index) {
    
    return (state, compareItem, i) => {

            if ((compareItem !== null) && (compareItem === state[i][index])) {
            return [i, index]
        }

        return []
    }
}


function getWinnerItems(state, compareItem, callback) {
    let result 
    let winnerItems = []

    for (let i = 0; i < state.length; i++) {
        result = callback(state, compareItem, i)

        if (result.length > 0) {
            winnerItems.push(result)
        } else {
            winnerItems = []
            break
        }

    }

    return winnerItems
}


function getFindWinning() {
    let winnerItems = []

    winnerItems = getWinnerItems(state, state[0][0], getResultDiagonal1)
    if (winnerItems.length > 0) {
        return winnerItems
    }

    winnerItems = getWinnerItems(state, state[state.length - 1][0], getResultDiagonal2)
    if (winnerItems.length > 0) {
        return winnerItems
    }

    for (let i = 0; i < state.length; i++) {

        winnerItems = getWinnerItems(state, state[i][0], getHandleResultRow(i))
        if (winnerItems.length > 0) {
            return winnerItems
        }

        winnerItems = getWinnerItems(state, state[0][i], getHandleResultColum(i))
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

