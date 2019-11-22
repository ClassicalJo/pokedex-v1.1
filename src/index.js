import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiFetch: "https://pokeapi.co/api/v2/pokemon/",
            pokemonUrl: "https://pokeapi.co/api/v2/pokemon/1/",
            currentPage: 1,
        }
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.handleClickPokemonList = this.handleClickPokemonList.bind(this)
        this.handleKeyDownPokemonList = this.handleKeyDownPokemonList.bind(this)
        
    }

    componentDidMount() {
        fetch(this.state.apiFetch)
            .then((responseText) => responseText.json())
            .then((response) => this.setState(response))
    }

    nextPage() {
        if (this.state.next !== null) {
            fetch(this.state.next)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
        }
        this.setState((state) => { if (this.state.currentPage < 49) { state.currentPage++ } })
    }

    previousPage() {
        if (this.state.previous !== null) {
            fetch(this.state.previous)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
        }
        this.setState((state) => { if (this.state.currentPage > 2) { state.currentPage-- } })
    }

    handleClickPokemonList(e) {
        this.setState({ 
            pokeName: e.target.attributes.pokename.nodeValue,
            pokemonUrl: e.target.attributes.url.nodeValue
        })
    }

    handleChangePokemonList() {
        let currentValue = this.refs.pagesearcher.value
        let fixedValue = this.refs.pagesearcher.value
        if (/^[0-9]+$/.test(currentValue) === false) { fixedValue = currentValue.replace(/[^0-9]/, '') }
        if (Number(fixedValue) > 49) { fixedValue = 49 } 
        else if (Number(fixedValue) < 1) { fixedValue = 1 }
        this.refs.pagesearcher.value = fixedValue
    }

    handleKeyDownPokemonList(e) {
        if (e.key === "Enter") {
            let url = generateUrl(this.refs.pagesearcher.value)
            fetch(url)
                .then((responseText) => responseText.json())
                .then((response) => this.setState(response))
            this.setState({ currentPage: this.refs.pagesearcher.value })
            this.refs.pagesearcher.value = ''
            this.refs.pagesearcher.blur()
        };
    }


    render() {
        if (this.state.results !== undefined) {
            return (
                <div className="container">
                    <div className="logo"><a href="https://pokeapi.co">PokéAPI</a></div>
                    <div className="header"><h1>POKéDEX</h1></div>
                    <div className="sidebar">
                        <div className="pokemon-list">{this.state.results.map((x) =>
                            <input
                                readOnly={true}
                                key={x.name}
                                value={x.name.toUpperCase()}
                                className="pokemonButton"
                                url={x.url}
                                pokename={x.name}
                                onClick={(event) => this.handleClickPokemonList(event)}
                            />)}
                        </div>
                        <div className="searcher">Page <input
                            id="page-searcher"
                            type="text"
                            ref="pagesearcher"
                            placeholder={this.state.currentPage}
                            onChange={() => this.handleChangePokemonList()}
                            onKeyDown={(event) => this.handleKeyDownPokemonList(event)}>
                        </input> of 49
                        </div>
                        <input className="navButton" type="button" value="previous" onClick={() => this.previousPage()}></input>
                        <input className="navButton" type="button" value="next" onClick={() => this.nextPage()}></input>

                    </div>
                    <App
                        className="main"
                        pokeName={this.state.pokeName}
                        pokemonUrl={this.state.pokemonUrl}
                    />
                </div >
            )
        }
        else { return <div>Loading...</div> }
    }
}

function generateUrl(index) {
    let urlStart = "https://pokeapi.co/api/v2/pokemon/?offset="
    let requestedPage = String(Number(index) * 20 - 20)
    let urlEnd = "&limit=20"
    return urlStart + requestedPage + urlEnd
}

ReactDOM.render(<Main />, document.getElementById("root"))

