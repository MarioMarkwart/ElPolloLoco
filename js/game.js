let canvas;
let world;
let keyboard = new Keyboard();
let globalIntervalIds = [];
let gameStarted = false;
let gameRunning = false;
let godmode = false;
let	totalImages = 0;
let totalImagesLoaded = 0;
let totalImagesLoadedPercent = 0;
let totalImagesLoadedPercentOld = 999;
let allGraphicsLoaded = false;
let loadingScreenImagesCache = {};
let soundBar = new Sound();
let isLandscape = false;
let isMobile = false;
let fullscreen = false;


/**
 * Initializes the game by preloading loading screen images, adding keyboard event listeners, 
 * and switching the game state to the start screen.
 */
function init(){
	checkIsMobile();
	preloadLoadingScreenImages();
	addKeyboardEventListener();
	addMobileButtonsEventListener();
	addDeviceEventListeners();
	switchGameState('startScreen');
	toggleControlButtons();
	getOrientation();
}


/**
 * Checks whether the current device is a mobile device or not.
 * @returns {void}
 */
function checkIsMobile(){
	if ("ontouchstart" in document.documentElement){
		isMobile = true;
	}
	else isMobile = false;
}


/**
 * Toggles the visibility of the mobile buttons and keyboard keys based on whether the
 * device is a mobile device or not.
 * @returns {void}
 */
function toggleControlButtons(){
	if(isMobile){
		if(gameRunning) document.getElementById('mobile-buttons').classList.remove('d-none');
		document.getElementById('keyboard-keys').classList.add('d-none');
	}
	else{
		document.getElementById('mobile-buttons').classList.add('d-none');
		document.getElementById('keyboard-keys').classList.remove('d-none');
	}
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
	level = ''
	world = new World(canvas, keyboard);
}


function stopGame() {
/**
 * Stops the game by stopping all sounds and clearing all intervals and timeouts,
 * and sets the gameRunning flag to false.
 * @returns {void}
 */
	soundBar.stopAllSounds();
	for (let i=0; i<1000000;i++){
		clearInterval(i);
		clearTimeout(i);
	}
	gameRunning = false;
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
	gameStarted = true;
	gameRunning = true;
	changeMenuButtons();
	toggleControlButtons();
	playBackgroundMusic();
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
function removeClassesFromOverlay() {
	let overlay = document.getElementById('gamestate-screen');
	if (gameRunning) {
		overlay.removeAttribute('class');
	} else {
		if (gameStarted) {
			overlay.removeAttribute('class');
		} else {
			overlay.removeAttribute('class');
			overlay.classList.add('start')
		}
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
	else if (state == 'pause') pauseGame();
}


/**
 * Sets the game state to 'rotateDevice', which shows the 'rotate your device'
 * screen and hides any other game state visuals.
 *
 * @returns {void}
 */
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
function changeMenuButtons(){
	if (gameRunning){
		setButtonsWhenGameIsRunning();
	} else {
		setButtonsWhenGameIsNotRunning();
	}
}


/**
 * Changes the image and onclick attribute of the play button and help button
 * when the game is running.
 *
 * The play button is changed to the pause button and its onclick attribute is
 * set to switchGameState("pause"), and the help button is changed to the
 * restart button and its onclick attribute is set to switchGameState("restart").
 *
 * @returns {void}
 */
function setButtonsWhenGameIsRunning(){
	let playBtn = document.getElementById('btn-play');
	let helpBtn = document.getElementById('btn-help');

	playBtn.src = 'assets/img/buttons/pause.png'
	playBtn.setAttribute('onclick', 'switchGameState("pause")');
	helpBtn.src = 'assets/img/buttons/restart.png';
	helpBtn.setAttribute('onclick', 'switchGameState("restart")');
}

/**
 * Changes the image and onclick attribute of the play button and help button based on the current
 * game state.
 * 
 * If the game is not running, the play button is changed to the start button and its onclick
 * attribute is set to startGame(), and the help button is changed to the instruction button and its
 * onclick attribute is set to openInstructions(). If the game is paused, the play button is changed
 * to the resume button and its onclick attribute is set to world.resume().
 * @returns {void}
 */
function setButtonsWhenGameIsNotRunning(){
	let playBtn = document.getElementById('btn-play');
	let helpBtn = document.getElementById('btn-help');

	helpBtn.src = 'assets/img/buttons/help.png';
	helpBtn.setAttribute('onclick', 'openInstructions()');
	playBtn.src = 'assets/img/buttons/play.png'
	if(world.isPaused) playBtn.setAttribute('onclick', 'world.resume()');
	else playBtn.setAttribute('onclick', 'startGame()');
}


/**
 * Sets the start screen by adding the 'start' class to the 'gamestate-screen' overlay element.
 * This will display the start screen with the play button.
 * @returns {void}
 */
function setStartScreen(){
	let overlay = document.getElementById('gamestate-screen');
	overlay.classList.remove('rotate-device')
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
		if (godmode) world.statusBarBottles.setAmount(500);
		else world.statusBarBottles.setAmount(5);
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
	soundBar.soundIsEnabled ? soundBar.setInitialVolume() : soundBar.stopAllSounds();
	soundBar.setSoundButton();
	playBackgroundMusic();
}


/**
 * Plays the background music of the game if sound is enabled.
 * 
 * This function checks the soundIsEnabled flag of the soundBar object and plays the
 * background music if sound is enabled. The background music is an Audio object stored
 * in the world object.
 * @returns {void}
 */
function playBackgroundMusic(){
	if (gameRunning && soundBar.soundIsEnabled){
		soundBar.playSound('backgroundMusic');
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
}


/**
 * Adds event listeners for touch events to control character actions on mobile devices.
 *
 * The listeners handle touchstart, touchend, and touchcancel events for the mobile buttons
 * with IDs btnLeft, btnRight, btnJump, and btnThrow. The respective actions are triggered
 * when the buttons are touched or released. The function ensures that both mobile and
 * keyboard interactions are supported for character control.
 */
function addMobileButtonsEventListener(){
	let btnLeft = document.getElementById('btnLeft');
	let btnRight = document.getElementById('btnRight');
	let btnJump = document.getElementById('btnJump');
	let btnThrow = document.getElementById('btnThrow');

	btnLeft.addEventListener('touchstart', (event) => { event.preventDefault(); keyboard.LEFT = true});
	btnRight.addEventListener('touchstart', (event) => { event.preventDefault(); keyboard.RIGHT = true});
	btnJump.addEventListener('touchstart', (event) => { event.preventDefault(); keyboard.SPACE = true});
	btnThrow.addEventListener('touchstart', (event) => { event.preventDefault(); keyboard.D = true});

	btnLeft.addEventListener('touchend', (event) => { event.preventDefault(); keyboard.LEFT = false});
	btnRight.addEventListener('touchend', (event) => { event.preventDefault(); keyboard.RIGHT = false});
	btnJump.addEventListener('touchend', (event) => { event.preventDefault(); keyboard.SPACE = false});
	btnThrow.addEventListener('touchend', (event) => { event.preventDefault(); keyboard.D = false});
	
	btnLeft.addEventListener('touchcancel', (event) => { event.preventDefault(); keyboard.LEFT = false});
	btnRight.addEventListener('touchcancel', (event) => { event.preventDefault(); keyboard.RIGHT = false});
	btnJump.addEventListener('touchcancel', (event) => { event.preventDefault(); keyboard.SPACE = false});
	btnThrow.addEventListener('touchcancel', (event) => { event.preventDefault(); keyboard.D = false});
}


/**
 * Adds event listeners for device orientation changes and window resizes.
 * When the device orientation is changed, the game is either paused or resumed, depending on the new orientation.
 * When the window is resized, the orientation is checked again to ensure the game is in the correct state.
 * @private
 */
function addDeviceEventListeners() {
	screen.orientation.addEventListener("change", (event) => setScreenOrientation(event));
}


/**
 * Handles screen orientation changes.
 * If the new orientation is landscape, the game is resumed and the game state is set to "game".
 * If the new orientation is not landscape, the game is paused and the game state is set to "rotateDevice".
 * @param {Event} event - The screen orientation change event.
 * @private
 */
function setScreenOrientation(event) {
	const type = event.target.type;
	if (type === "landscape-primary" || type === "landscape-secondary") {
		if(gameStarted) world.resume();
		switchGameState("game");
	} else {
		if(gameStarted)world.pause();
		switchGameState("rotateDevice");
	}
}


/**
 * Checks the current window orientation and sets the isLandscape boolean accordingly.
 * The function is used to check if the device is in landscape orientation and if
 * the game should be paused or resumed. The function is called when the window is
 * resized and when the device orientation is changed.
 * @private
 */
function getOrientation(){
	if(window.innerHeight >= window.innerWidth){
		switchGameState("rotateDevice");
	}else{
		isLandscape = true;
	}
}