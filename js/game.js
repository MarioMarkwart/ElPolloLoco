let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameRunning = false;
let godmode = false;
let	totalImages = 0;
let totalImagesLoaded = 0;
let totalImagesLoadedPercent = 0;
let totalImagesLoadedPercentOld = 999;
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
	if (matchMedia('(pointer:coarse)').matches){
		isMobile = true;
	}
	if(matchMedia('(pointer:fine)').matches) {
		isMobile = false;
	}
}


/**
 * Adds the class 'mobile' to the play, help, fullscreen, and sound buttons on the main menu.
 * This disables the hover effect on these buttons on mobile devices.
 * @returns {void}
 */
function toggleClassMobileToMenuButton(){
	let gameplayButtons = document.getElementById('gameplay-buttons');
	[...gameplayButtons.children].forEach(btn => {
		isMobile ? btn.classList.add('mobile') : btn.classList.remove('mobile');
	});
}


/**
 * Toggles the visibility of the mobile buttons and keyboard keys based on whether the
 * device is a mobile device or not.
 * @returns {void}
 */
function toggleControlButtons(){
	if(isMobile){
		if(gameRunning) document.getElementById('mobile-buttons').classList.remove('d-none'); 
		else document.getElementById('mobile-buttons').classList.add('d-none');
		document.getElementById('keyboard-keys').classList.add('d-none');
	}
	else{
		document.getElementById('mobile-buttons').classList.add('d-none');
		document.getElementById('keyboard-keys').classList.remove('d-none');
	}
}


/**
 * Shows or hides the reset button based on the provided state.
 * @param {string} state - The state of the reset button. Should be either 'show' or 'hide'.
 * @returns {void}
 */
function toggleResetButton(state){
	if(state == 'show') document.getElementById('btn-reset').classList.remove('d-none');
	if (state == 'hide') document.getElementById('btn-reset').classList.add('d-none');
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
	level = '';
	world = new World(canvas, keyboard);
}


/**
 * Initializes the game by calling initLevel() and initWorld(),
 * sets the gameRunning flag to true, and changes the play button.
 *
 * @returns {void}
 */
function startGame(){
	resetLoadingScreenImages();
	initLevel();
	initWorld();
	gameStarted = true;
	gameRunning = true;
	changeMenuButtons();
	toggleResetButton('hide');
	toggleControlButtons();
	playBackgroundMusic();
}


/**
 * Removes all classes from the 'gamestate-screen' overlay element if the game is running.
 * This is used to clear any visual state indicators from the overlay during gameplay.
 */
function removeScreensFromOverlay() {
	let overlay = document.getElementById('gamestate-screen');
	if (gameRunning) overlay.removeAttribute('class');
	if (!gameStarted) overlay.classList.add('start')
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
	helpBtn.src = 'assets/img/buttons/home.png';
	helpBtn.setAttribute('onclick', 'switchGameState("home")');
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
	if(world) playBtn.setAttribute('onclick', 'world.resume()');
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
	if (soundBar.soundIsEnabled){
		soundBar.playSound('backgroundMusic');
	}
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
 * Toggles the visibility of the headline, depending on the window height.
 * The headline is hidden when the window height is less than or equal to 600px.
 * @private
 */
function toggleHeadline(){
	let title = document.getElementById('title');
	if(window.innerHeight >= 600 && !document.getElementById('instructions').hasAttribute('opened')){
		title.style.display = 'flex';
	}else{
		title.style.display = 'none'
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
	toggleHeadline();
	if(isMobile && window.innerHeight >= window.innerWidth){
		switchGameState("rotateDevice");
	}else{
		isLandscape = true;
	}
}