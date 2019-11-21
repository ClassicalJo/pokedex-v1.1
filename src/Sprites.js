import React from 'react';

class Sprites extends React.Component {
    render() {
        if (this.props.currentImg !== undefined) {
            return <img
                alt="Pokemon"
                src={this.props.currentImg} />
        }
        else {
            return <div>Loading...</div>
        }
    }
}
export default Sprites
