import { useState } from "react";
import Home from "./Home";
import Game from "./Game";

function App() {
    const [startGame, setStartGame] = useState(false);
    return (
        <div className="container">
            {startGame ? (
                <Game startGame={setStartGame} />
            ) : (
                <Home startGame={setStartGame} />
            )}
        </div>
    );
}

export default App;
