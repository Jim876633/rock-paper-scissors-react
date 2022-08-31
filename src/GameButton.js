import React, { useState, useEffect } from "react";

const GameButton = ({ icon, gameStartHandler, value, alert, gameResult }) => {
    const [click, setClick] = useState(false);
    useEffect(() => {
        const timeID = setTimeout(() => {
            setClick(false);
        }, 1000);
        return () => {
            clearTimeout(timeID);
        };
    }, [click]);
    return (
        <button
            className={`gameBtn btn ${alert && "gameBtn-disable"} ${
                click && `gameBtn-click gameBtn-click-${gameResult}`
            }`}
            onClick={() => {
                if (alert) return;
                gameStartHandler(value);
                setClick(true);
            }}
        >
            {icon}
        </button>
    );
};

export default GameButton;
