import React from 'react';

import './style.css';

const MemeRoom = (props) => {
    return(
        <div className="App">
        
        <div className="playersContainer1">
        <h1>Current meme</h1>
        <div className="memeImage">
          {props.displayMeme}
        </div>
          {props.displayPlayers}
        </div>
        
        {/* <div className="gameOverview">
          <h1>Overview</h1>
        </div> */}
      </div>
    )
}

export default MemeRoom;