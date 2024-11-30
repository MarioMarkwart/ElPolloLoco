/**
 * Switches the game state to the specified state.
 * 
 * This function manages the transition between different game states, such as
 * 'startScreen', 'game', 'won', 'lost', and 'restart'. Each state triggers a
 * corresponding action to update the game state and display the appropriate
 * screen. The function ensures that the game logic and visuals are consistently
 * updated according to the current state.
 * 
 * @param {string} state - The desired game state to switch to.
 * @returns {void}
 */
function switchGameState(state){
	if (state == 'startScreen') setStartScreen();
	else if (state == 'game') removeClassesFromOverlay();
	else if (state == 'won' || state == 'lost') setFinalScreen(state);
	else if (state == 'restart') restartGame();
	else if (state == 'rotateDevice') rotateDevice();
	else if (state == 'pause') pauseGame();
}


/**
 * Pauses the game by calling World.pause() and switching the play button.
 *
 * @returns {void}
 */
function pauseGame(){
    world.pause();
    changeMenuButtons();
}


/**
 * Stops the game by stopping all sounds and clearing all intervals and timeouts,
 * and sets the gameRunning flag to false.
 * @returns {void}
 */
function stopGame() {
    soundBar.stopAllSounds();
    for (let i=0; i<1000000;i++){
        clearInterval(i);
        clearTimeout(i);
    }
    gameRunning = false;
}


/**
 * Restarts the game by setting the game state to 'startScreen', stopping the game and
 * all intervals, stopping all sounds, starting the game again, and finally setting the
 * game state to 'game'.
 * @returns {void}
 */
function restartGame(){
    switchGameState('startScreen');
    stopGame();
    cancelAnimationFrame(world.animationFrameId);
    startGame();
    if (soundBar.soundIsEnabled) soundBar.setInitialVolume();
    switchGameState('game');
}


/**
 * Transitions the game state to 'lost' by invoking the switchGameState function
 * with the 'lost' parameter, indicating that the player has lost the game.
 */
function gameLost(){
	switchGameState('lost');
}


/**
 * Transitions the game state to 'won' by invoking the switchGameState function
 * with the 'won' parameter, indicating that the player has won the game.
 */
function gameWon(){
	switchGameState('won');
}


/**
 * Triggers the win sequence of the game.
 * 
 * This function is called when the player has won the game. It plays the win sound
 * of the character, stops all intervals and sounds, and sets the final screen of the
 * game to 'won' after a delay of 1 second.
 * @returns {void}
 */
function youWon(){
	world.character.playWinSound();
	setTimeout(() => {
		stopGame();
		setFinalScreen('won');
	},1000)
}


/**
 * Triggers the loss sequence of the game.
 * 
 * This function is called when the player has lost the game. It plays the lost sound
 * of the character, stops all intervals and sounds, and sets the final screen of the
 * game to 'lost' after a delay of 0.5 seconds.
 * @returns {void}
 */
function youLost(){
	world.character.playLostSound();
	setTimeout(() => {
		stopGame();
		setFinalScreen('lost');
	}, 500)
}


/**
 * Sets the final screen of the game based on the result of the game.
 * If the game is won, the 'won' class is added to the 'gamestate-screen' overlay element.
 * If the game is lost, the 'lost' class is added to the overlay element, and after a delay of 2 seconds,
 * the 'game-over' class is added and the 'lost' class is removed.
 * @param {string} result - The result of the game, either 'won' or 'lost'.
 * @returns {void}
 */
function setFinalScreen(result){
	let overlay = document.getElementById('gamestate-screen');
	overlay.classList.remove('d-none');
	if (result === 'won'){
		overlay.classList.add('won');
	}
	if (result === 'lost'){
		overlay.classList.add('lost')
		setTimeout(() => {
			overlay.classList.remove('lost');
			overlay.classList.add('game-over');
		},2000)
	}
}