import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTruns) {
	let currentPlayer = "X";

	if (gameTruns.length > 0 && gameTruns[0].player === "X") {
		currentPlayer = "O";
	}
	return currentPlayer;
}

function App() {
	const [players, setPlayers] = useState({
		X: "Player 1",
		O: "player 2",
	});

	const [gameTruns, setGameTruns] = useState([]);
	// const [hasWinner, setHasWinner] = useState(false);
	// const [activePlayer, setActivePlayer] = useState("X");

	const activePlayer = deriveActivePlayer(gameTruns);
	let gameBoard = [...initialGameBoard.map((array) => [...array])];

	for (const turn of gameTruns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	let winner = null;

	for (const combinations of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combinations[0].row][combinations[0].column];
		const secondSquareSymbol =
			gameBoard[combinations[1].row][combinations[1].column];
		const thirdSquareSymbol =
			gameBoard[combinations[2].row][combinations[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}

	const hasDraw = gameTruns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		// setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
		setGameTruns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	function handleRestart() {
		setGameTruns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((PrevPlayers) => {
			return {
				...PrevPlayers,
				[symbol]: newName,
			};
		});
	}

	return (
		<>
			<main>
				<div id="game-container">
					<ol id="players" className="highlight-player">
						<Player
							initialName="Player 1"
							symbol="X"
							isActive={activePlayer === "X"}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							initialName="Player 2"
							symbol="O"
							isActive={activePlayer === "O"}
							onChangeName={handlePlayerNameChange}
						/>
					</ol>
					{(winner || hasDraw) && (
						<GameOver winner={winner} onRestart={handleRestart} />
					)}
					<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
				</div>
				<Log turns={gameTruns} />
			</main>
		</>
	);
}

export default App;
