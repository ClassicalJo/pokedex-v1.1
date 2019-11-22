import React from 'react'

class Types extends React.Component {
    render() {
        return (
            <div className="types">
                <div >TYPES:</div>
                {this.props.types.map((x) => <li
                    key={x.type.name}
                    typeurl={x.type.url}
                    onClick={this.props.onClick}>
                    {x.type.name.toUpperCase()}</li>)}
            </div>)
    }
}

export default Types