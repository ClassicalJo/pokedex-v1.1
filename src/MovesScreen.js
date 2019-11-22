import React from "react"

class MovesScreen extends React.Component {
    render() {
        let movesArray = []
        if (this.props.moves !== undefined) { this.props.moves.map((x) => movesArray.push([x.version_group_details[0].level_learned_at, x.move.name])) }
        bubbleSort(movesArray)
        levelsFirstSort(movesArray)

        if (this.props.moves !== undefined) {
            return (
                <div className="screen">
                    {movesArray.map((x) => (<div key={x[1]}> {x[1].toUpperCase().replace(/-/, ' ')} learned at: {x[0]}</div>))}
                    < button onClick={this.props.onClick} className="screen-close" > Close screen</button>
                </div >
            )
        }
        else { return <div classname="screen">Loading...</div> }
    }
}

export default MovesScreen

function bubbleSort(list) {
    let swapped
    let n = list.length - 1
    do {
        swapped = false
        for (let i = 0; i < n; i++) {
            // compare pairs of elements
            // if left element > right element, swap
            if (list[i][0] > list[i + 1][0]) {
                const temp = list[i]
                list[i] = list[i + 1]
                list[i + 1] = temp
                swapped = true
            }
        }
    }
    // continue swapping until sorted
    while (swapped)

    return list
}

function levelsFirstSort(list) {
    let len = list.length
    let cut = 0
    for (let i = 0; i < len; i++) {
        if (list[i][0] === 0) { cut++ }
    }
    let temp = list.splice(0, cut)
    list = list.concat(temp)
    return list

}