import React from 'react';
import './App.css';
import Sprites from "./Sprites";
import Ability from "./Ability"
import Types from "./Types"
import AbilityScreen from './AbilityScreen';
import TypeScreen from './TypeScreen';


class App extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  pokemonUrl: "https://pokeapi.co/api/v2/pokemon/1/",
                  pokemonSpecies: "https://pokeapi.co/api/v2/pokemon-species/1/",
                  currentIndex: 0,
            }
            this.componentDidUpdate = this.componentDidUpdate.bind(this)
            this.handleClickAbility = this.handleClickAbility.bind(this)
      }
      componentDidMount() {
            fetch(this.state.pokemonUrl)
                  .then((responseText) => responseText.json())
                  .then((response) => this.setState(response))
                  .then(fetch(this.state.pokemonSpecies)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response)))
      }

      componentDidUpdate(prevProps) {
            if (prevProps.pokemonUrl !== this.props.pokemonUrl) {
                  fetch(this.props.pokemonUrl)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response))
                        .then(() => this.setState({
                              images: [this.state.sprites.front_default, this.state.sprites.back_default, this.state.sprites.front_shiny, this.state.sprites.back_shiny],
                              currentIndex: 0,

                        }))
                  fetch(`https://pokeapi.co/api/v2/pokemon-species/${compareUrl(this.props.pokemonUrl)}`)
                        .then((responseText) => responseText.json())
                        .then((response) => this.setState(response))
            }
      }


      handleClickNext() {
            if (this.state.currentIndex < 3) { this.setState({ currentIndex: this.state.currentIndex + 1 }) }
      }

      handleClickPrevious() {
            if (this.state.currentIndex > 0) { this.setState({ currentIndex: this.state.currentIndex - 1 }) }
      }

      handleClickAbility(e) {
            e.persist()
            this.setState({ abilityurl: e.target.attributes.abilityurl.nodeValue })
            let $main = document.querySelector(".main")
            $main.classList.add("hidden")
            let $abilityScreen = document.querySelector(".ability-screen")
            $abilityScreen.classList.remove("hidden")

      }

      handleClickCloseScreenAbility() {
            let $abilityScreen = document.querySelector(".ability-screen")
            $abilityScreen.classList.add("hidden")
            let $main = document.querySelector(".main")
            $main.classList.remove("hidden")
      }

      handleClickType(e) {
            e.persist()
            this.setState({ typeurl: e.target.attributes.typeurl.nodeValue })
            let $main = document.querySelector(".main")
            $main.classList.add("hidden")
            let $typeScreen = document.querySelector(".type-screen")
            $typeScreen.classList.remove("hidden")

      }

      handleClickCloseScreenType() {
            let $typeScreen = document.querySelector(".type-screen")
            $typeScreen.classList.add("hidden")
            let $main = document.querySelector(".main")
            $main.classList.remove("hidden")
      }

      render() {
            let stateResults = this.state
            if (this.state.images === undefined) { return <div className="welcome">Welcome to Pokedex by ClassicalJo</div> }
            if (stateResults) {
                  return (
                        <div className="app">
                              <div className="main">
                                    <div className="sprites">
                                          <Sprites currentImg={this.state.images[this.state.currentIndex]} />
                                          <input className="spriteButton" type="button" value="<=" onClick={() => this.handleClickPrevious()}></input>
                                          <input className="spriteButton" type="button" value="=>" onClick={() => this.handleClickNext()}></input>
                                    </div>
                                    <div className="name" id="name">{this.state.name.toUpperCase()}</div>
                                    <div className="height">HEIGHT: {stateResults.height / 10} METRE</div>
                                    <div className="weight">WEIGHT: {stateResults.weight / 10} KG.</div>
                                    <div className="number">No. {fixed(stateResults.id)}</div>
                                    <Types 
                                          types={this.state.types} 
                                          onClick={(e) => this.handleClickType(e)}
                                          />
                                    <Ability
                                          abilities={this.state.abilities}
                                          onClick={(e) => this.handleClickAbility(e)}
                                    />
                                    <div className="stats">
                                          <div>HP: {this.state.stats[5].base_stat}</div>
                                          <div>ATTACK: {this.state.stats[4].base_stat}</div>
                                          <div>DEFENSE: {this.state.stats[3].base_stat}</div>
                                          <div>SPECIAL ATTACK: {this.state.stats[2].base_stat}</div>
                                          <div>SPECIAL DEFENSE: {this.state.stats[1].base_stat}</div>
                                          <div>SPEED: {this.state.stats[0].base_stat}</div>
                                    </div>
                                    <div className="description">{returnFirstResult(this.state.flavor_text_entries)}</div>
                              </div>
                              <AbilityScreen abilityurl={this.state.abilityurl} onClick={() => this.handleClickCloseScreenAbility()} />
                              <TypeScreen typeurl={this.state.typeurl} onClick={() => this.handleClickCloseScreenType()}/>
                        </div>

                  )

            } else {
                  return <div>loading...</div>
            }
      }
}
// 
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

function compareUrl(string) {
      let result = string.replace(/^https:\/\/pokeapi.co\/api\/v2\/pokemon\//, "")
      return result
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
