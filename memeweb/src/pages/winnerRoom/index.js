import React from 'react';

import './style.css';

import MemeDisplay from '../../components/memeDisplay';

const WinnerRoom = (props) => {
    return(
        <div className="containerW">
            <h1>Winner</h1>
            <div className="winMeme">
                <MemeDisplay />
            </div>
            <h2>Player</h2>
            <button>play again</button>
        </div>
    )
}

export default WinnerRoom;