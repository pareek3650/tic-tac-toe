const GameOver = ({ winner, onRestart }) => {
	// const refreshPage = () => window.location.reload();
	return (
		<div id="game-over">
			<h2>Game Over! </h2>

			{winner && <p>{winner} won!</p>}

			{!winner && <p>It's a Draw</p>}
			<p>
				<button onClick={onRestart}>Rematch!</button>
			</p>
		</div>
	);
};
export default GameOver;
