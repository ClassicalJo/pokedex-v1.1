import React from 'react'

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Jordan Belfort'
        }
    }

    getData() {
        fetch("https://pokeapi.co/api/v2/pokemon-species/1/").then(function(response) {
            response.json().then(function(json){
                let result = json.flavor_text_entries[1].flavor_text
                return result
            })
        })
    }

    componentDidMount() {
        let string = this.getData()
        console.log(string)
        this.setState({data: string}) 
    }

    render() {
        return (
            <div>
                {this.state.data}
            </div>
        )
    }
}
export default Description