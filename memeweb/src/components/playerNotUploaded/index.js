import React, { Component } from 'react';
import './style.css'

class PlayerNotUploaded extends Component {
    render() {
        return (
            <div class="PlayerNot">
                <div>
                    <img class="playerImage2" alt="" src="https://vignette.wikia.nocookie.net/tehmeme/images/5/50/Wiki-background/revision/latest?cb=20120502012910" />
                </div>
                <h1 class="playerName">{this.props.player}</h1>
            </div>
        );
    }
}
export default PlayerNotUploaded;
