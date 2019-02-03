import React, { Component } from 'react';
import './style.css'

class Button extends Component {
    render() {
        return (
            <div class="Button" onClick={this.props.restart}>
                <h1>Play Again</h1>
            </div>
        )
    }
}

export default Button;