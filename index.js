let rootElement = window.document.getElementById("root")

let tableElement = document.createElement("div")
tableElement.classList.add("table")
rootElement.appendChild(tableElement)

let statusElement = document.createElement("div")
statusElement.classList.add("status")
rootElement.appendChild(statusElement)

 




let state = [
    [null, "X", null],
    [null, null, null],
    [null, null, null],
]

// 0[0, 1, 2],[]
// 1[0, 1, 2],
// 2[0, 1, 2],

// let winnerItems = [[0,0],[1,1],[2,2]]

function changeState(a) {
    state = []

    for (i = 0; i < a; i++) {
        state.push([])
        for (j = 0; j < a; j++) {
            state[i].push(null)
        }

    }

    render(state, [])

}
function createNewGameButton() {
    let newGameButton = document.createElement("button")
    newGameButton.textContent = "Новая игра"
    statusElement.appendChild(newGameButton)
    return newGameButton
}

function createSelect() {
    let table3X3 = "3x3"
    let table4X4 = "4x4"
    let table5X5 = "5x5"
    let table10X10 = "10x10"
    let table15X15 = "15x15"

    let stateOptions = [table3X3, table4X4, table5X5, table10X10, table15X15]

    let selectList = document.createElement("select");
    statusElement.appendChild(selectList)

    for (i = 0; i < stateOptions.length; i++) {
        let selectOptions = document.createElement("option")
        selectOptions.value = stateOptions[i]
        if (selectOptions.value === table3X3) {
            selectOptions.selected = "selected"
        }
        selectOptions.text = stateOptions[i]
        selectList.appendChild(selectOptions)
    }

    selectList.addEventListener("change", function() {
        if (this.value === table3X3) {
            changeState(3)
        } else if (this.value === table4X4) {
            changeState(4)
        } else if (this.value === table5X5) {
            changeState(5)
        } else if (this.value === table10X10) {
            changeState(10)
        } else if (this.value === table15X15) {
            changeState(15)
        }
    })

    return selectList

}

function findWinnerItem(items, y, x) {

    function findWinerElement(item) {
        if ((item[0] === y) && (item[1] === x)) {
            return true
        }
    }

    return items.find(findWinerElement)

}



function render(state, item) {
    tableElement.textContent = ""

    for (let i = 0; i < state.length; i++) {
        let rowElement = window.document.createElement("div");
        rowElement.classList.add("row");
        tableElement.appendChild(rowElement)

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

createSelect()
render(state, [])
createNewGameButton()

