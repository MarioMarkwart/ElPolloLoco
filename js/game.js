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
let soundBar = new Sound();
let landscape = false;

/**
 * Initializes the game by preloading loading screen images, adding keyboard event listeners, 
 * and switching the game state to the start screen.
 */
function init(){
	checkIsMobile();
	preloadLoadingScreenImages();
	addKeyboardEventListener();
	addLandscapeEventListener();
	switchGameState('startScreen');
}

// function checkIsMobile() {
// 	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }


function checkOrientation(){
	
}

function checkIsMobile(){
	if ("ontouchstart" in document.documentElement) console.log('mobile')
	else(console.log('desktop'))
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
}

function rotateDevice(){
	let overlay = document.getElementById('gamestate-screen');
	overlay.removeAttribute('class');
	overlay.classList.add('rotate-device');
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
		stopGame();
		soundBar.stopAllSounds();
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
		soundBar.stopAllSounds();
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
	soundBar.stopAllSounds();
	startGame();
	switchGameState('game');
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
 * Toggles the sound of the game. If the game is running, this function will toggle
 * the soundIsEnabled boolean of the soundBar and update the sound button in the
 * top right corner of the game to reflect the current state of the sound.
 *
 * @returns {void}
 */
function toggleSound(){
	soundBar.soundIsEnabled = !soundBar.soundIsEnabled;
	soundBar.setSoundButton();
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

screen.orientation.addEventListener("change", (event) => {
	const type = event.target.type;
	if (type === "landscape-primary" || type === "landscape-secondary"){
		// landscape = true;
		world.resume()
		switchGameState('game');
	} 
	else {
		// landscape = false;
		world.pause()
		switchGameState('rotateDevice')
	}
  });