let canvas;
let world;
let keyboard = new Keyboard();
let globalIntervalIds = [];
let gameRunning = false;
let godmode = false;
let	totalImages = 0;
let totalImagesLoaded = 0;
let totalImagesLoadedPercent = 0;
let totalImagesLoadedPercentOld = 999;
let allGraphicsLoaded = false;
let loadingScreenImagesCache = {};


/**
 * Initializes the game by preloading loading screen images, adding keyboard event listeners, 
 * and switching the game state to the start screen.
 */
function init(){
	preloadLoadingScreenImages();
	addKeyboardEventListener();
	switchGameState('startScreen');
}


/**
 * Initializes the game world.
 * 
 * This function retrieves the canvas element from the DOM, creates a new World object
 * with the canvas and keyboard, and assigns it to the global 'world' variable.
 * It also logs the world and character objects for debugging purposes.
 */
function initWorld() {
	canvas = document.getElementById("canvas");
	world = '';
	world = new World(canvas, keyboard);
	console.log("My world is: ", world);
	console.log("My character is: ", world.character);
}


/**
 * Sets a stoppable interval for executing the given function at the specified time interval,
 * and stores the interval ID along with a description.
 *
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval in milliseconds for executing the function.
 * @param {string} description - A description of the interval for tracking purposes.
 */
function setStoppableInterval(fn, time, description) {
	let id = setInterval(fn, time);
	globalIntervalIds.push({ 'interval': id, 'description': description });
}


/**
 * Stops the game by clearing all intervals and timeouts, setting the gameRunning
 * flag to false, and logging 'Game stopped' to the console.
 *
 * This function iterates through a large range of IDs to ensure that all
 * intervals and timeouts are cleared, effectively stopping any ongoing
 * repetitive or delayed actions in the game.
 */
function stopGame() {
	for (let i=0; i<10000;i++){
		clearInterval(i);
		clearTimeout(i);
	}
	gameRunning = false;
	console.log('Game stopped');
}


/**
 * Initializes the game by calling initLevel() and initWorld(),
 * sets the gameRunning flag to true, and changes the play button.
 *
 * @returns {void}
 */
function startGame(){
	initLevel();
	initWorld();
	gameRunning = true;
	changePlayButton()
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
 * Removes all classes from the 'gamestate-screen' overlay element if the game is running.
 * This is used to clear any visual state indicators from the overlay during gameplay.
 */
function removeClassesFromOverlay(){
	let overlay = document.getElementById('gamestate-screen');
	if(gameRunning){
		overlay.removeAttribute('class');
	}
}


/**
 * Switches the game state to the specified state.
 * 
 * This function is the central hub for changing the game state to any of the
 * following states: 'startScreen', 'game', 'won', 'lost', or 'restart'. It uses
 * a switch statement to call the appropriate function for each state.
 * 
 * Note that the 'startScreen' state is used to set up the start screen, the
 * 'game' state is used to set up the game, the 'won' and 'lost' states are used
 * to set up the final screens when the game is won or lost, and the 'restart'
 * state is used to restart the game.
 * @param {string} state - The desired game state.
 * @returns {void}
 */
function switchGameState(state){
	switch(state){
		case 'startScreen':
			setStartScreen();
			break;
		case 'game':
			removeClassesFromOverlay();
			break;
		case 'won':
			setFinalScreen('won');
			stopGame();
			break;
		case 'lost':
			setFinalScreen('lost');
			stopGame();
			break;
		case 'restart':
			restartGame();
			break;
	}
}


/**
 * Changes the image and onclick attribute of the play button based on the current
 * game state.
 * 
 * If the game is running, the play button is changed to the restart button and
 * its onclick attribute is set to switchGameState("restart"). If the game is not
 * running, the play button is changed to the start button and its onclick
 * attribute is set to startGame().
 * @returns {void}
 */
function changePlayButton(){
	let btn = document.getElementById('btn-play');
	if (gameRunning){
		btn.src = 'assets/img/buttons/restart.png'
		btn.setAttribute('onclick', 'switchGameState("restart")');
	} else {
		btn.src = 'assets/img/buttons/play.png';
		btn.setAttribute('onclick', 'startGame()');
	}
}


/**
 * Sets the start screen by adding the 'start' class to the 'gamestate-screen' overlay element.
 * This will display the start screen with the play button.
 * @returns {void}
 */
function setStartScreen(){
	let overlay = document.getElementById('gamestate-screen');
	overlay.classList.add('start');
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
		// stopAllIntervals();
		stopGame();
		stopAllSounds();
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
		// stopAllIntervals();
		stopGame();
		stopAllSounds();
		setFinalScreen('lost');
	}, 500)
}


/**
 * Restarts the game by setting the game state to 'startScreen', stopping the game and
 * all intervals, stopping all sounds, starting the game again, and finally setting the
 * game state to 'game'.
 * @returns {void}
 */
function restartGame(){
	switchGameState('startScreen');
	stopAllSounds();
	startGame();
	switchGameState('game');
}


/**
 * Stops all sounds from all enemies in the game world.
 *
 * This function iterates over all enemies in the game world and stops all
 * sounds from their sound cache. It is used when the game is lost or won.
 * @returns {void}
 */
function stopAllSounds() {
	world.level.enemies.forEach((enemy) =>
		Object.keys(enemy.soundCache).forEach((sound) => enemy.soundCache[sound].pause())
	);
}


/**
 * Toggles the godmode of the game. If the game is running, this function will toggle
 * the godmode boolean and set the amount of the world's StatusBarBottles to 500 if
 * godmode is enabled, or 5 if godmode is disabled. The function will log a warning
 * to the console with the current state of godmode.
 *
 * @returns {void}
 */
function toggleGodmode(){
	if (gameRunning) {
		godmode = !godmode;
		if (godmode){
			console.warn('Godmode is on');
			world.statusBarBottles.setAmount(500);
		} 
		else {
			console.warn('Godmode is off');
			world.statusBarBottles.setAmount(5);
		}
	}
}


/**
 * Adds event listeners for both keyboard and touch events to control character actions.
 *
 * The listeners handle keydown and keyup events for arrow keys, space, and 'd' for movement
 * and actions. It also toggles godmode on 'g' keyup. For touch events, it listens for touchstart,
 * touchend, and touchcancel on buttons with specific IDs to handle the corresponding actions.
 * The function ensures that both keyboard and touch interactions are supported for character control.
 *
 * @returns {void}
 */
function addKeyboardEventListener() {
	window.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") keyboard.LEFT = true;
		if (event.key === "ArrowRight") keyboard.RIGHT = true;
		if (event.key === "d") keyboard.D = true;
		if (event.key === " ") keyboard.SPACE = true;
	});

	window.addEventListener("keyup", (event) => {
		if (event.key === "ArrowLeft") keyboard.LEFT = false;
		if (event.key === "ArrowRight") keyboard.RIGHT = false;
		if (event.key === "d") keyboard.D = false;
		if (event.key === " ") keyboard.SPACE = false;
		if (event.key === "g") toggleGodmode();
	});

	window.addEventListener("touchstart", (event) => {
		if (event.target.id === "btnLeft") keyboard.LEFT = true;
		if (event.target.id === "btnRight") keyboard.RIGHT = true;
		if (event.target.id === "btnJump") keyboard.SPACE = true;
		if (event.target.id === "btnThrow") keyboard.D = true;
	});

	window.addEventListener("touchend", (event) => {
		if (event.target.id === "btnLeft") keyboard.LEFT = false;
		if (event.target.id === "btnRight") keyboard.RIGHT = false;
		if (event.target.id === "btnJump") keyboard.SPACE = false;
		if (event.target.id === "btnThrow") keyboard.D = false;
	});

	window.addEventListener("touchcancel", (event) => {
		if (event.target.id === "btnLeft") keyboard.LEFT = false;
		if (event.target.id === "btnRight") keyboard.RIGHT = false;
		if (event.target.id === "btnJump") keyboard.SPACE = false;
		if (event.target.id === "btnThrow") keyboard.D = false;
	});
}