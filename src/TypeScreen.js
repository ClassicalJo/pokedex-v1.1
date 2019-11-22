import React from "react"

class TypeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        fetch(this.props.typeurl)
            .then((responseText) => responseText.json())
            .then((response) => this.setState(response))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.typeurl !== this.props.typeurl) {
            fetch(this.props.typeurl)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
        }
    }

    render() {
        if (this.state.name !== undefined) {
            return (
            <div className="screen">
                <div className="screen-text">TYPE NAME: {this.state.name.toUpperCase()}</div>
                <div className="screen-text">ID: {this.state.id}</div>
                <div className="screen-text">
                    2x DAMAGE FROM: {this.state.damage_relations.double_damage_from.map((x) => String(x.name.toUpperCase()) + " ")}<br />
                    2x DAMAGE TO: {this.state.damage_relations.double_damage_to.map((x) => String(x.name.toUpperCase()) + " ")}</div>
                <div className="screen-text">
                    1/2 DAMAGE FROM: {this.state.damage_relations.half_damage_from.map((x) => String(x.name.toUpperCase()) + " ")}<br />
                    1/2 DAMAGE TO: {this.state.damage_relations.half_damage_to.map((x) => String(x.name.toUpperCase()) + " ")}</div>
                <div className="screen-text">
                    NO DAMAGE FROM: {this.state.damage_relations.no_damage_from.map((x) => String(x.name.toUpperCase()) + " ")}<br />
                    NO DAMAGE TO: {this.state.damage_relations.no_damage_to.map((x) => String(x.name.toUpperCase()) + " ")}</div>
                <button onClick={this.props.onClick} className="screen-close" >Close screen</button>
            </div>
            )
        }
        else { return <div className="screen">Loading...</div> }
    }
}
export default TypeScreen