import React from 'react'


class Ability extends React.Component {
    render() {
        return (
            <div className="abilities">
                <div>ABILITIES:</div>
                {this.props.abilities.map((x) =>
                    <li key={x.ability.name}
                        abilityurl={x.ability.url}
                        onClick={this.props.onClick}
                    >{x.ability.name.toUpperCase().replace(/-/, ' ')}</li>)}
            </div>)
    }
}


export default Ability