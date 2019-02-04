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
const socket = io.connect('http://da266d20.ngrok.io/');



let Memes = [
  "https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg",
  "https://steemitimages.com/DQmX8zvPuPz5wn3UrV4T2ZEsgfDV8PzGcCfLdQCopNpughS/success.jpg",
  "https://imgflip.com/s/meme/Creepy-Condescending-Wonka.jpg",
  "https://www.meme-arsenal.com/memes/072e3bda503faa894d1688ac48554fe1.jpg",
  "http://scripts.cac.psu.edu/users/a/l/alb191/webcamp/maleena/meme21.jpg",
  "https://i.imgflip.com/1d7avw.jpg",
  "https://imgflip.com/s/meme/Roll-Safe-Think-About-It.jpg"
]

let initialState = {
  players: [],
  startGame: false,
  newPlayer: false,
  playerToAdd: null,
  currentMeme: "https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg",
  playerUploaded: null,
  versus: false,
  Winner: false,
  startVoting: false,
  votingOne:null,
  votingTwo: null,
  currentlyVoting: false,
  curWinner:null,
  winningMeme:null,
  waitingRoom:true,
  resultOne: null,
  resultTwo: null
}

// Winners = [];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState

    

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }

  socket.on('web-addWinner',(name) => {
    console.log('winner: '+ name)
    console.log("this is voter 1: "+ this.state.votingOne);
    console.log("this is voter 2: "+ this.state.votingTwo)
    if(this.state.votingOne.name == name){
      this.setState({resultOne:'winner'}) 
      this.setState({resultTwo:'loser'})
    }
    else{
      this.setState({resultTwo:'winner'}) 
      this.setState({resultOne:'loser'})
    }
    
    console.log('setting the winner')
    console.log(name);
    this.setState({curWinner:name});

    
  })

    socket.on('web-displayAddedPlayer', (name) => {
      this.setState({ playerToAdd: name })

    })
    socket.on('all-start', (memeUrl) => {
      //set the current meme being displayed to this url
      console.log("received memee")
      this.setState({ currentMeme: memeUrl })

    })

    socket.on('web-playerUploadedMeme',(name) => {
      console.log(name)
      this.setState({playerUploaded:name});
      console.log('set');
    })

    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

    socket.on('voting-done',async (winnerData) => {
    await timeout(3000);   

      let {meme,data} = winnerData
      console.log('voting results')

      console.log(data)

      let countKnockedOut = 0;
      let gameOver = false;

      let foundOne = false;
      let foundTwo = false

      let player1;

      let dataRes = {
        name1:null,
        name2:null
      }
      var BreakException = {};
      
        for(let player of data) {
          if(player.knockedOut == true){
           console.log('player knockout out')
            countKnockedOut ++;
          }

          if(player.knockedOut == false){
            console.log('finding player 1')
            dataRes.name1 = player.name;
            player1 = player.name;
            this.setState({votingOne: player})
            console.log('set player 1')
            break;
          }
        }

        if(countKnockedOut == data.length-1){
          gameOver = true;
        }
        
        console.log("knocked out players: "+countKnockedOut)

        for(let player of data){
          if(player.knockedOut == true){
            console.log('player knockout out')
             countKnockedOut ++;
           }
          console.log('finding player 2')
          if(player.knockedOut == false &&  player.name != player1){
            dataRes.name2 = player.name;
            foundTwo = true;
            this.setState({votingTwo: player})
            console.log('set player 2')
            break;
          }
        }

        if(countKnockedOut == data.length-1){
          gameOver = true;
        }
      
      if(gameOver){
        console.log('game over')
        for(let player of data){
          if(player.name == this.state.curWinner)
            this.setState({winningMeme:meme})
        }
        console.log('winning meme');
        console.log(this.state.winningMeme)
        socket.emit('web-gameOver',(this.state.curWinner));
        this.setState({winner:true});
        this.setState({versus:false});
        this.setState({MemeRoom:false});
      }

      else{
      console.log('done setting players')
      this.setState({startGame:false});
      this.setState({currentlyVoting:true});
      socket.emit('web-setPlayerNumbers',(dataRes));
      }

    })

    socket.on('web-doneUploading',(data) => {
      console.log('everyone uploaded');
      // shuffleArray(data);

      let countKnockedOut = 0;
      let gameOver = false;

      let foundOne = false;
      let foundTwo = false

      let player1;

      let dataRes = {
        name1:null,
        name2:null
      }
      var BreakException = {};
      
        for(let player of data) {
          if(player.knockedOut == true)
            countKnockedOut ++;

          if(player.knockedOut == false){
            console.log('finding player 1')
            dataRes.name1 = player.name;
            player1 = player.name;
            this.setState({votingOne: player})
            console.log('set player 1')
            break;
          }
        }

        if(countKnockedOut == data.length){
          gameOver = true;
        }
      
        for(let player of data){
          console.log('finding player 2')
          if(player.knockedOut == false &&  player.name != player1){
            dataRes.name2 = player.name;
            foundTwo = true;
            this.setState({votingTwo: player})
            console.log('set player 2')
            break;
          }
        }
      
      if(gameOver){
        console.log('game over')
        socket.emit('web-gameOver',(this.state.curWinner));
        this.setState({Winner:true});
        this.setState({startGame:false})
        this.setState({versus:false});
        
      }

      else{
      console.log('done setting players')
      this.setState({startGame:false});
      this.setState({currentlyVoting:true});
      socket.emit('web-setPlayerNumbers',(dataRes));
      }

    })

  }

  setNewDisplayMeme = () => {
    let newMeme = Memes[Math.floor(Math.random()*Memes.length)];

    this.setState({currentMeme:newMeme})
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

  restart = () => {
    socket.emit('web-newGame');
    console.log('restarting game')
    initialState.players = [];
    console.log(initialState)
    this.setState(initialState)
    this.setNewDisplayMeme();
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
    socket.emit('web-startGame',"https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg")
  }


  render() {
    if (this.state.playerToAdd != null) {
      this.addNewPlayer(this.state.playerToAdd);
    }

    if(this.state.playerUploaded != null){
      this.updatePlayerStatus(this.state.playerUploaded);
    }

    if(this.state.currentlyVoting){
      console.log('ready for versus');
      console.log(this.state.votingOne);
      console.log(this.state.votingTwo);
      this.setState({versus:true})
      this.setState({startGame:false})
      this.setState({currentlyVoting:false})
      this.setState({waitingRoom:false})
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
            <VersusRoom 
            resultOne = {this.state.resultOne}
            resultTwo = {this.state.resultTwo}
            url={this.state.currentMeme}
            player1Meme={this.state.votingOne.currentMeme}
            player2Meme={this.state.votingTwo.currentMeme}
            />
          )
    
    else if(this.state.waitingRoom)
      return (
        <WaitingRoom 
        displayPlayers = {displayPlayers}
        displayButton = {displayButton}
        displayMeme = {displayMeme}
        />
      );
      else 
        return(
          <WinnerRoom
          restart = {this.restart} 
          url={this.state.currentMeme}
          meme = {this.state.winningMeme}
          winner = {this.state.curWinner}
          />
      )
      
  }
}

export default App;
