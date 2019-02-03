import React, { Component } from 'react';
import './App.css';
import PlayerUploaded from './components/playerUploaded';
import PlayerNotUploaded from './components/playerNotUploaded';
import Button from './components/button';

import WaitingRoom from './pages/waitingRoom';
import MemeRoom from './pages/memeRoom';
import VersusRoom from './pages/versusRoom';
import WinnerRoom from './pages/winnerRoom';


const io = require('socket.io-client');
const socket = io.connect('http://af7af856.ngrok.io');

let Memes = [
  "https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg",
  "https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg",
  "https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg"
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      startGame: false,
      newPlayer: false,
      playerToAdd: null,
      currentMeme: null,
      playerUploaded: null,
      versus: false,
      Winner: false
    }
    socket.on('web-displayAddedPlayer', (name) => {
      this.setState({ playerToAdd: name })

    })
    socket.on('all-start', (memeUrl) => {
      //set the current meme being displayed to this url
      console.log("received memee")
      this.setState({ currentMeme: memeUrl })

    })

    socket.on('web-playerUploadedMeme',(name) => {
      this.setState({playerUploaded:name});
      console.log('set');
    })
  }

  setNewDisplayMeme = () => {
    this.state.currentMeme = Memes[Math.floor(Math.random()*Memes.length)];
  }

  addNewPlayer = (name) => {
    // this.setState((state) => {
    //   return { Players: state.players.push(Players) }
    // });
    let arr = this.state.players;
    let player = {name:name,uploaded: false}
    arr.push(player);

    this.setState({ players: arr });
    this.setState({ playerToAdd: null })


  }

  updatePlayerStatus = (name) => {
    let arr = this.state.players;
    arr.map(player => {
      if(player.name == name){
        player.uploaded = true;
        console.log('updated')
        }
    })

    this.setState({players: arr});
    this.setState({playerUploaded:null});

  }

  buttonClicked = () => {
    //on pressing start button
    this.setState({ startGame: !this.state.startGame })
    this.setNewDisplayMeme();
    socket.emit('web-startGame',this.state.currentMeme)
  }


  render() {
    if (this.state.playerToAdd != null) {
      this.addNewPlayer(this.state.playerToAdd);
    }

    if(this.state.playerUploaded != null){
      this.updatePlayerStatus(this.state.playerUploaded);
    }

    //displays the button if the game hasn't started 
    let displayButton = !this.state.startGame ? <Button buttonClicked={this.buttonClicked}>
    </Button> : null

    let displayPlayers;
    
    
    displayPlayers = <div className="game">
      {this.state.players.map(player => {
      if(player.uploaded == false)
        return <PlayerNotUploaded player={player.name} />

      else if(player.uploaded == true)
        return <PlayerUploaded player={player.name} />
    })}
    </div> 


    let displayMeme = this.state.currentMeme != null ? <img alt="" src={this.state.currentMeme} /> : null
    if(this.state.startGame)
        return(
      <MemeRoom 
      displayMeme = {displayMeme}
      displayPlayers = {displayPlayers}
      />
        )

    else if(this.state.versus)
          return (
            <VersusRoom />
          )
    
    else if(this.state.Winner)
            return(
              <WinnerRoom />
            )

    else
      return (
        <WaitingRoom 
        displayPlayers = {displayPlayers}
        displayButton = {displayButton}
        displayMeme = {displayMeme}
        />
      );
  }
}

export default App;
