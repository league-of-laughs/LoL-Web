import React from 'react';

import './style.css';

import MemeDisplay from '../../components/memeDisplay';

import RestartButton from '../../components/restartGame'

const WinnerRoom = (props) => {
    return(
        <div className="containerW">
            <h1>Winner</h1>
            <div className="winMeme">
                <MemeDisplay
                url={props.url}
                topText = {props.meme.topText}
                number={null}
                bottomText = {props.meme.bottomText}
                />
            </div>
            <h2>{props.winner}</h2>
            <RestartButton restart = {props.restart}/>
        </div>
    )
}

export default WinnerRoom;