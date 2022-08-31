import React, { useState, useEffect } from "react";
import GameButton from "./GameButton";
import {
    FaHandPaper,
    FaHandScissors,
    FaHandRock,
    FaRegQuestionCircle,
} from "react-icons/fa";

const Game = ({ startGame }) => {
    const gameButton = [
        { icon: <FaHandPaper className="paper" />, value: 0 },
        { icon: <FaHandScissors className="scissors" />, value: 1 },
        { icon: <FaHandRock className="stone" />, value: 2 },
    ];
    const [gameIcon, setGameIcon] = useState(<FaRegQuestionCircle />);
    const [gameResult, setGameResult] = useState({ result: "" });
    const [score, setScore] = useState(0);
    const [life, setLife] = useState(5);
    const [alert, setAlert] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const randomNumber = () => {
        return Math.floor(Math.random() * gameButton.length);
    };

    const gameStartHandler = (value) => {
        const gameNumber = randomNumber();
        setGameIcon(gameButton[gameNumber].icon);
        let result;
        if (value === gameNumber) {
            result = "tie";
        } else if (Math.abs(value - gameNumber) === 1) {
            if (value > gameNumber) {
                result = "win";
            } else {
                result = "lose";
            }
        } else if (value === 0) {
            result = "win";
        } else {
            result = "lose";
        }
        setGameResult({ ...gameResult, result: result });
    };

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) return;
        setAlert(true);
        switch (gameResult.result) {
            case "tie":
                setScore(score);
                break;
            case "win":
                setScore(score + 1);
                break;
            case "lose":
                setLife(life - 1);
        }
        const timeID = setTimeout(() => {
            setAlert(false);
            setGameIcon(<FaRegQuestionCircle />);
        }, 1000);
        return () => {
            clearTimeout(timeID);
        };
    }, [gameResult]);

    if (life === 0) {
        return (
            <div className="game">
                <div className="result-block">
                    <p className="result">Your Score : {score}</p>
                    <button
                        className="btn againBtn"
                        onClick={() => {
                            startGame(false);
                        }}
                    >
                        Again
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="game">
            <div className="count-block">
                <div className="life">
                    Life : <span className="life-icon">{"❤".repeat(life)}</span>
                </div>
                <p className="score">Score : {score}</p>
            </div>
            <div className="gammer">
                <p
                    className={
                        alert
                            ? `message message-${gameResult.result}`
                            : "message"
                    }
                >
                    {gameResult.result}
                </p>

                {gameIcon}
            </div>
            <div className="gameBtn-block">
                {gameButton.map((icon, index) => (
                    <GameButton
                        key={index}
                        gameStartHandler={gameStartHandler}
                        {...icon}
                        alert={alert}
                        gameResult={gameResult.result}
                    />
                ))}
            </div>
        </div>
    );
};

export default Game;
