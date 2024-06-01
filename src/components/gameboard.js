import React, { useEffect } from "react";
import { useState } from "react";//Hook function import
import GameCircle from "./GameCircle";
import Header from "./header";
import Footer from "./footer";
import { isDraw, isWinner, getComputerMove } from "./helper";
import {
    GAME_STATE_PLAYING,
    NoPlayer,
    PlayerOne,
    NoCircles,
    GAME_STATE_WIN,
    PlayerTwo,
    GAME_STATE_DRAW
} from './constants'
const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NoCircles).fill(NoPlayer));
    const [currentPlayer, setCurrentPlayer] = useState(PlayerOne);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NoPlayer);
    useEffect(() => {
        initGame();
    }, [])
    //initialize game after a WIn
    const initGame = () => {
        console.log('initGame');
        setGameBoard(Array(NoCircles).fill(NoPlayer));
        setCurrentPlayer(PlayerOne);
        setGameState(GAME_STATE_PLAYING)
        setGameState(GAME_STATE_PLAYING);
    }
    //Import BASIC game play AI 
    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }
    //Check clicked circle
    const circleClicked = (id) => {
        // debugger
        //console.log('circle clicked :' + id);
        //Prevent player from clicking already clicked circle
        if (gameBoard[id] !== NoPlayer)
            return;
        //Stop the game when winner is declared
        if (gameState !== GAME_STATE_PLAYING) return;
        //calculate winner
        if (isWinner(gameBoard, id, currentPlayer)) {
            // console.log("WINNER");
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }
        //calculate draw
        if (isDraw(gameBoard, id, currentPlayer)) {
            // console.log("WINNER");
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NoPlayer);
        }
        const board = [...gameBoard];//creating copy of the array to avoid mutation
        board[id] = currentPlayer;
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        });
        setCurrentPlayer(currentPlayer === PlayerOne ? PlayerTwo : PlayerOne)
        console.log(gameBoard);
        console.log("current player: " + currentPlayer);
    }
    //loop to generate circles
    const initBoard = () => {
        const circles = [];

        for (let i = 0; i < NoCircles; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }
    //Render generated circles on the screen
    const renderCircle = (id) => {
        return (
            //key => Assigns every circle unique ID
            <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} oncircleClicked={circleClicked} />
        )
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div >
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
        </>
    )
}
export default GameBoard;