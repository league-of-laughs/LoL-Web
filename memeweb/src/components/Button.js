import React, { Component } from 'react';
import '../App.css'

class Button extends Component {
    render() {
        return (
            <div class="Button" onClick={this.props.buttonClicked}>
                <h1>Start Game</h1>
            </div>
        )
    }
}

export default Button;