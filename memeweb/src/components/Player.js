import React, { Component } from 'react';
import '../App.css'

class Player extends Component {
    render() {
        return (
            <div class="Player">
                <div>
                    <img class="playerImage" alt="" src="https://www.hurricanes.co.nz/fileadmin/images/Players/01_img_hero_player_generic.png" />
                </div>
                <h1 class="playerName">{this.props.player}</h1>
            </div>
        );
    }
}
export default Player;
