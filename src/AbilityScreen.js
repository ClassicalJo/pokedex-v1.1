import React from "react"

class AbilityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abilityurl !== this.props.abilityurl) {
            fetch(this.props.abilityurl)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
        }
    }
    render() {
        if (this.state.name !== undefined) {
            return <div className="hidden ability-screen">
                <div className="ability-screen-text">ABILITY NAME: {this.state.name.toUpperCase().replace(/-/, ' ')} </div>
                <div className="ability-screen-text">ID: {this.state.id}</div>
                <div className="ability-screen-text">EFFECT: {this.state.effect_entries[0].effect}</div>
                <div className="ability-screen-text">USERS: {this.state.pokemon.map((x) => String(x.pokemon.name.toUpperCase()) + " ")}</div>
                <button className="screen-close" onClick={this.props.onClick}>Close screen</button>
            </div>
        }
        else { return <div className="hidden ability-screen">Loading...</div> }
    }
}

export default AbilityScreen