import React from 'react';

class Sprites extends React.Component {
    render() {
        return <img
            alt="Pokemon"
            src={this.props.currentImg} />
    }
}

Sprites.defaultProps = { currentImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" }
export default Sprites
