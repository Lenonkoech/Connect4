import React from "react";
import {
    GAME_STATE_DRAW,
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
} from './constants'

const Header = ({ currentPlayer, winPlayer, gameState }) => {
    const renderLabel = () => {
        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <div>Player {currentPlayer} Turn</div>
            case GAME_STATE_WIN:
                return <div>Player {winPlayer} Wins</div>
            case GAME_STATE_DRAW:
                return <div>DRAW</div>
            default:
        }
    }
    return (
        <div className="panel header">
            <div className="header-text">{renderLabel()}</div>
        </div>
    )
}
export default Header;