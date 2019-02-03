import React from 'react';

import './style.css';

import MemeDisplay from '../../components/memeDisplay';

const VersusRoom = (props) => {
    return(
        <div>
            <h1 id="vote">Vote</h1>
        <div className="Appv">
        <div className="playersContainer2">
          <MemeDisplay number={1} url={props.url} topText={props.player1Meme.topText} bottomText={props.player1Meme.bottomText} result = {props.resultOne}/>
          <h1 id="versus" >VS</h1>
          <MemeDisplay number = {2} url={props.url} topText={props.player2Meme.topText} bottomText={props.player2Meme.bottomText} result = {props.resultTwo}/>
        </div>
        {/* <div className="gameOverview">
          <h1>Overview</h1>
        </div> */}
      </div>
      </div>
    )
}

export default VersusRoom;