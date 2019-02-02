import React, { Component } from 'react';
import './App.css';
import Player from './components/Player';
import Button from './components/Button';


const io = require('socket.io-client');
const socket = io.connect('http://af7af856.ngrok.io');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      startGame: false,
      newPlayer: false,
      playerToAdd: null,
      currentMeme: null,
    }
    socket.on('web-displayAddedPlayer', (name) => {
      this.setState({ playerToAdd: name })

    })
    socket.on('all-start', (memeUrl) => {
      //set the current meme being displayed to this url
      console.log("received memee")
      this.setState({ currentMeme: memeUrl })

    })
  }

  addNewPlayer = (name) => {
    // this.setState((state) => {
    //   return { Players: state.players.push(Players) }
    // });
    let arr = this.state.players;
    arr.push(name);

    this.setState({ players: arr });

  }



  buttonClicked = () => {
    //on pressing start button
    this.setState({ startGame: !this.state.startGame })
    socket.emit('web-startGame')
  }


  render() {
    if (this.state.playerToAdd != null) {
      this.addNewPlayer(this.state.playerToAdd);
      this.setState({ playerToAdd: null })
    }

    //displays the button if the game hasn't started 
    let displayButton = !this.state.startGame ? <Button buttonClicked={this.buttonClicked}>
    </Button> : null
    let displayPlayers = !this.state.startGame ? <div className="game">
      {this.state.players.map(player => <Player player={player} ></Player>
      )}
    </div> : null

    let displayMeme = this.state.currentMeme != null ? <img alt="" src={this.state.currentMeme} /> : null
    return (
      <div className="App">
        <div className="playersContainer">
          {displayPlayers}
          {displayButton}
          {displayMeme}
        </div>
        <div className="gameOverview">
          <h1>Overview</h1>
        </div>
      </div>
    );
  }
}

export default App;
