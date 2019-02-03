import React from 'react';

import './style.css';

import Winner from '../winner';
import Loser from '../loser';

const MemeDisplay = (props) => {
let url;

if(props.result == 'winner')
    url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/1024px-Green_check.svg.png"
else if(props.result == 'loser')
    url = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/1024px-Red_x.svg.png'
    
    if(url)
    return(
        <div className="container">
        <p>{props.number}</p>
        <div className = "topText">
        <h1>{props.topText}</h1>
        </div>
        <img src={props.url}/>
        <div className = "bottomText" >
        <h1> {props.bottomText}</h1>
        </div>
        <img class="result" src={url}/>
        </div>
    )
    else
    return(
        <div className="container">
        <p>{props.number}</p>
        <div className = "topText">
        <h1>{props.topText}</h1>
        </div>
        <img src={props.url}/>
        <div className = "bottomText" >
        <h1> {props.bottomText}</h1>
        </div>
        </div>
    )
}

export default MemeDisplay