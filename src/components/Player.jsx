import { useState } from "react";
function Player({ initialName, symbol, isActive, onChangeName }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);
	function handleClickEdit() {
		setIsEditing((editing) => !editing);

		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	function handleChange(event) {
		setPlayerName(event.target.value);
	}
	let editableplayerName = <span className="player-name">{playerName}</span>;
	if (isEditing === true) {
		editableplayerName = (
			<input type="text" required value={playerName} onChange={handleChange} />
		);
	}
	return (
		<>
			<li className={isActive ? "active" : undefined}>
				<span className="players">
					{editableplayerName}
					<span className="player-symbol">{symbol}</span>
				</span>
				<button onClick={handleClickEdit}>
					{isEditing === true ? "Save" : "Edit"}
				</button>
			</li>
		</>
	);
}

export default Player;
