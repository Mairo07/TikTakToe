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

function getResult(type, compareItem, i, index) {
    let comparison = true
    let result

        if (type === "diagonal1") {
            comparison = compareItem === state[i][i]
            result = [i, i]
        } else if (type === "diagonal2") {
            comparison = compareItem === state[i][state.length - 1 - i]
            result = [i, state.length - 1 - i]
        } else if (type === "row") {
            comparison = compareItem === state[index][i]
            result = [index, i]
        } else if (type === "colum") {
            comparison = compareItem === state[i][index]
            result = [i, index]
        }

        if ((compareItem !== null) && (comparison === true)) {
            return result
        }
    
    return []
}

function getWinnerItems(state, type, compareItem, callback, index) {
    let result 
    let winnerItems = []

    for (let i = 0; i < state.length; i++) {
        result = callback(type, compareItem, i, index)

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

    winnerItems = getWinnerItems(state, "diagonal1", state[0][0], getResult)
    if (winnerItems.length > 0) {
        return winnerItems
    }

    winnerItems = getWinnerItems(state, "diagonal2", state[state.length - 1][0], getResult)
    if (winnerItems.length > 0) {
        return winnerItems
    }

    for (let i = 0; i < state.length; i++) {


        winnerItems = getWinnerItems(state, "row", state[i][0], getResult, i)
        if (winnerItems.length > 0) {
            return winnerItems
        }

        winnerItems = getWinnerItems(state, "colum", state[0][i], getResult, i)
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

