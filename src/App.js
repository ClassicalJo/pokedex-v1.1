import React from 'react';
import './App.css';
import Sprites from "./Sprites";
import Ability from "./Ability"
import Types from "./Types"
import AbilityScreen from './AbilityScreen';
import TypeScreen from './TypeScreen';
import MovesScreen from "./MovesScreen"


class App extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  pokemonSpecies: "https://pokeapi.co/api/v2/pokemon-species/1/",
                  currentImageIndex: 0,
                  showTypeScreen: false,
                  showAbilityScreen: false,
                  showMovesScreen: false,
            }
            this.componentDidUpdate = this.componentDidUpdate.bind(this)
            this.handleClickAbility = this.handleClickAbility.bind(this)
            this.handleClickType = this.handleClickType.bind(this)
            this.handleClickMoves = this.handleClickMoves.bind(this)
      }

      componentDidMount() {
            fetch(this.props.pokemonUrl)
                  .then((responseText) => responseText.json())
                  .then((response) => this.setState(response))
                  .then(fetch(this.state.pokemonSpecies)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response)))
      }

      componentDidUpdate(prevProps) {
            if (prevProps.pokemonUrl !== this.props.pokemonUrl) {
                  this.removeScreen()
                  fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokeName}`)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response))
                        .then(() => this.setState((state) => ({
                              currentImageIndex: 0,
                              images:
                                    [state.sprites.front_default,
                                    state.sprites.back_default,
                                    state.sprites.front_shiny,
                                    state.sprites.back_shiny]
                        })))

                  fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.pokeName}`)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response))
            }
      }

      handleClickNext() {
            if (this.state.currentImageIndex < 3) { this.setState({ currentImageIndex: this.state.currentImageIndex + 1 }) }
      }

      handleClickPrevious() {
            if (this.state.currentImageIndex > 0) { this.setState({ currentImageIndex: this.state.currentImageIndex - 1 }) }
      }

      handleClickAbility(e) {
            this.setState({
                  abilityurl: e.target.attributes.abilityurl.nodeValue,
                  showAbilityScreen: true,
            })
      }

      handleClickType(e) {
            this.setState({
                  typeurl: e.target.attributes.typeurl.nodeValue,
                  showTypeScreen: true
            })
      }

      handleClickMoves() {
            this.setState({
                  showMovesScreen: true
            })
      }
      removeScreen() {
            this.setState({
                  showTypeScreen: false,
                  showAbilityScreen: false,
                  showMovesScreen: false,
            })
      }

      render() {
            let stateResults = this.state
            if (this.state.images === undefined) { return <div className="welcome">Welcome to Pokedex by ClassicalJo</div> }
            if (stateResults) {
                  return (
                        <div className="app">
                              <div className="main">
                                    <div className="sprites">
                                          <Sprites currentImg={this.state.images[this.state.currentImageIndex]} />
                                          <input className="spriteButton" type="button" value="<=" onClick={() => this.handleClickPrevious()}></input>
                                          <input className="spriteButton" type="button" value="=>" onClick={() => this.handleClickNext()}></input>
                                    </div>
                                    <div className="name" id="name">{this.state.name.toUpperCase()}</div>
                                    <div className="height">HEIGHT: {stateResults.height / 10} METRE</div>
                                    <div className="weight">WEIGHT: {stateResults.weight / 10} KG.</div>
                                    <div className="number">No. {fixed(stateResults.id)}</div>
                                    <Types
                                          types={this.state.types}
                                          onClick={(this.handleClickType)}
                                    />
                                    <Ability
                                          abilities={this.state.abilities}
                                          onClick={this.handleClickAbility}
                                    />
                                    <div className="moves" onClick={this.handleClickMoves}>MOVELIST</div>
                                    <div className="stats">
                                          <div>HP: {this.state.stats[5].base_stat}</div>
                                          <div>ATTACK: {this.state.stats[4].base_stat}</div>
                                          <div>DEFENSE: {this.state.stats[3].base_stat}</div>
                                          <div>SPECIAL ATTACK: {this.state.stats[2].base_stat}</div>
                                          <div>SPECIAL DEFENSE: {this.state.stats[1].base_stat}</div>
                                          <div>SPEED: {this.state.stats[0].base_stat}</div>
                                    </div>
                                    <div className="description">{returnFirstResult(this.state.flavor_text_entries)}</div>
                                    {this.state.showTypeScreen === true &&
                                          <TypeScreen
                                                typeurl={this.state.typeurl}
                                                showTypeScreen={this.state.showTypeScreen}
                                                onClick={() => this.removeScreen()} />
                                    }
                                    {this.state.showAbilityScreen === true &&
                                          <AbilityScreen
                                                abilityurl={this.state.abilityurl}
                                                showAbilityScreen={this.state.showAbilityScreen}
                                                onClick={() => this.removeScreen()} />
                                    }
                                    {this.state.showMovesScreen === true &&
                                          <MovesScreen
                                                moves={this.state.moves}
                                                showMovesScreen={this.state.showMovesScreen}
                                                onClick={() => this.removeScreen()} />
                                    }
                              </div>


                        </div>

                  )

            } else {
                  return <div>Loading...</div>
            }
      }
}

function fixed(number) {
      let simpleValue = String(number)
      let isFixed = /^[0-9][0-9][0-9]$/.test(simpleValue)
      let fixedValue;

      if (isFixed === true) {
            fixedValue = simpleValue
      }

      else {
            while (simpleValue.length < 3) { simpleValue = "0" + simpleValue }
            fixedValue = simpleValue
      }

      return fixedValue
}

function returnFirstResult(array) {
      let results = array.map((x) => {
            if (x.language.name === "en" && x.flavor_text !== undefined) {
                  return x.flavor_text
            } else { return null }
      })
      let resultArray = []
      for (let i = 0; i < results.length; i++) {
            if (results[i] !== null) { resultArray.push(results[i]) }
      }
      return resultArray[0]
}
export default App;
