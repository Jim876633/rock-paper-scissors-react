import React from "react";

const Home = ({ startGame }) => {
    return (
        <div className="home">
            <h1 className="title">Paper-Scissors-Stone </h1>
            <button
                className="btn start-btn"
                onClick={() => {
                    startGame(true);
                }}
            >
                Start Game
            </button>
        </div>
    );
};

export default Home;
