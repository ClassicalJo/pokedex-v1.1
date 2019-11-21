import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickPokemonList = this.handleClickPokemonList.bind(this);
        this.state = {
            apiFetch: "https://pokeapi.co/api/v2/pokemon/",
            pokemonUrl: "https://pokeapi.co/api/v2/pokemon/1/"
        }

    }

    componentDidMount() {
        fetch(this.state.apiFetch)
            .then((responseText) => responseText.json())
            .then((response) => this.setState(response))
    }


    nextPage() {
        fetch(this.state.next)
            .then((responseText) => responseText.json())
            .then((response) => this.setState(response))
        let $pageSearcher = document.querySelector("#page-searcher")
        let fixedNumber = Number($pageSearcher.value) + 1
        $pageSearcher.value = fixedNumber < 49 ? fixedNumber : 49
    }

    previousPage() {
        fetch(this.state.previous)
            .then((responseText) => responseText.json())
            .then((response) => this.setState(response))
        let $pageSearcher = document.querySelector("#page-searcher")
        let fixedNumber = Number($pageSearcher.value) - 1
        $pageSearcher.value = fixedNumber > 1 ? fixedNumber : 1

    }

    handleClickPokemonList(e) {
        this.setState({
            pokemonUrl: this.state.results[e - 1].url,
        })
    }

    handleChangePokemonList() {
        let $pageSearcher = document.querySelector("#page-searcher")
        if ($pageSearcher.value !== "") {
            if (/^[0-9]+$/.test($pageSearcher.value) !== true) { $pageSearcher.value = 1 }
            if (Number($pageSearcher.value) > 49) { $pageSearcher.value = 49 }
            if (Number($pageSearcher.value) < 1) { $pageSearcher.value = 1 }
            let offset = $pageSearcher.value * 20 - 20 > 0 ? $pageSearcher.value * 20 - 20 : 0
            fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
        }


    }


    render() {
        if (this.state.results !== undefined) {
            return (
                <div className="container">
                    <div className="logo"><a href="https://pokeapi.co">PokéAPI</a></div>
                    <div className="header"><h1>POKéDEX</h1></div>
                    <div className="sidebar">

                        <div className="list">{this.state.results.map((x) =>
                            <input
                                readOnly={true}
                                key={x.name}
                                value={x.name.toUpperCase()}
                                className="pokemonButton"
                                onClick={() => this.handleClickPokemonList((this.state.results.indexOf(x) + 1))}
                            />
                        )}</div>
                        <div className="searcher">Page <input id="page-searcher" type="text" defaultValue="1" onChange={() => this.handleChangePokemonList()}></input> of 49</div>
                        <input className="navButton" type="button" value="previous" onClick={() => this.previousPage()}></input>
                        <input className="navButton" type="button" value="next" onClick={() => this.nextPage()}></input>

                    </div>
                    <App
                        className="main"
                        pokemonUrl={this.state.pokemonUrl}
                    />
                </div >
            )

        }

        else { return <div>Loading...</div> }
    }
}

ReactDOM.render(<Main />, document.getElementById("root"))

