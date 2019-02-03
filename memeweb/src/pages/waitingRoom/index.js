import React from 'react';

import './style.css';

const WaitingRoom = (props) => {
    return(
      <div>
        <h1 id="title">League of Memes</h1>
      
        <div className="AppW">
          <div className="playersContainer">
            {props.displayPlayers}
            {props.displayButton}
          </div>
          {/* <div className="gameOverview1">
            <h1>Overview</h1>
          </div> */}
        </div>
        </div>
    )
}

export default WaitingRoom;