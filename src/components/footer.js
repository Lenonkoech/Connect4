import React from "react";
import {
    GAME_STATE_PLAYING
} from './constants'
const Footer = ({ onNewGameClick, onSuggestClick, gameState }) => {
    return (
        <div className="panel footer">
            {
                gameState === GAME_STATE_PLAYING &&
                <button onClick={onSuggestClick}>Suggest</button>
            }
            {
                gameState !== GAME_STATE_PLAYING &&
                <button onClick={onNewGameClick}>New Game</button>
            }
        </div>
    );
};
export default Footer;