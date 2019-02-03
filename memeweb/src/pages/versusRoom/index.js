import React from 'react';

import './style.css';

import MemeDisplay from '../../components/memeDisplay';

const VersusRoom = (props) => {
    return(
        <div>
            <h1 id="vote">Vote</h1>
        <div className="Appv">
        <div className="playersContainer2">
          <MemeDisplay />
          <h1 id="versus" >VS</h1>
          <MemeDisplay />
        </div>
        {/* <div className="gameOverview">
          <h1>Overview</h1>
        </div> */}
      </div>
      </div>
    )
}

export default VersusRoom;