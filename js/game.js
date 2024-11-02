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



function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
	console.log("My world is: ", world);
	console.log("My character is: ", world.character);
	addListenerForGodmode();
}

function setStoppableInterval(fn, time, description) {
	let id = setInterval(fn, time);
	globalIntervalIds.push({ 'interval': id, 'description': description });
}

function stopGame() {
	for (let i=0; i<10000;i++){
		clearInterval(i);
		clearTimeout(i);
	}
	gameRunning = false;
	console.log('Game stopped');
}

window.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") keyboard.LEFT = true;
	if (event.key === "ArrowRight") keyboard.RIGHT = true;
	if (event.key === "ArrowUp") keyboard.UP = true;
	if (event.key === "ArrowDown") keyboard.DOWN = true;
	if (event.key === "d") keyboard.D = true;
	if (event.key === " ") keyboard.SPACE = true;
});

window.addEventListener("keyup", (event) => {
	if (event.key === "ArrowLeft") keyboard.LEFT = false;
	if (event.key === "ArrowRight") keyboard.RIGHT = false;
	if (event.key === "ArrowUp") keyboard.UP = false;
	if (event.key === "ArrowDown") keyboard.DOWN = false;
	if (event.key === "d") keyboard.D = false;
	if (event.key === " ") keyboard.SPACE = false;
});

window.addEventListener('touchstart', (event) => {
	if (event.target.id === 'btnLeft')  keyboard.LEFT = true; 
	if (event.target.id === 'btnRight')  keyboard.RIGHT = true; 
	if (event.target.id === 'btnJump')  keyboard.SPACE = true; 
	if (event.target.id === 'btnThrow')  keyboard.D = true; 
});

window.addEventListener('touchend', (event) => {
	if (event.target.id === 'btnLeft')  keyboard.LEFT = false; 
	if (event.target.id === 'btnRight')  keyboard.RIGHT = false; 
	if (event.target.id === 'btnJump')  keyboard.SPACE = false; 
	if (event.target.id === 'btnThrow')  keyboard.D = false; 
});

window.addEventListener('touchcancel', (event) => {
	if (event.target.id === 'btnLeft')  keyboard.LEFT = false; 
	if (event.target.id === 'btnRight')  keyboard.RIGHT = false; 
	if (event.target.id === 'btnJump')  keyboard.SPACE = false; 
	if (event.target.id === 'btnThrow')  keyboard.D = false; 
});


function startGame(){
	switchGameState('loadingScreen');
	initLevel();
	world = '';
	init();
	gameRunning = true;
	btnPlay.src = "assets/img/buttons/restart.png";
	btnPlay.setAttribute('onclick','restartGame()');
}


const loadingScreenImages = [
  'assets/img/loadingScreen/loadingScreen_0.png',
  'assets/img/loadingScreen/loadingScreen_10.png',
  'assets/img/loadingScreen/loadingScreen_20.png',
  'assets/img/loadingScreen/loadingScreen_30.png',
  'assets/img/loadingScreen/loadingScreen_40.png',
  'assets/img/loadingScreen/loadingScreen_50.png',
  'assets/img/loadingScreen/loadingScreen_60.png',
  'assets/img/loadingScreen/loadingScreen_70.png',
  'assets/img/loadingScreen/loadingScreen_80.png',
  'assets/img/loadingScreen/loadingScreen_90.png',
  'assets/img/loadingScreen/loadingScreen_100.png',
];


function preloadLoadingScreenImages() {
	loadingScreenImages.forEach(imagePath => {
	  const image = new Image();
	  image.src = imagePath;
	  loadingScreenImagesCache[imagePath] = image;
	});
  }

function setLoadingScreenImage() {
	let loadingScreen = document.getElementById('loading-screen');
	
	if (totalImagesLoadedPercent !== totalImagesLoadedPercentOld) {
		const imageSrc = loadingScreenImagesCache['assets/img/loadingScreen/loadingScreen_' + totalImagesLoadedPercent + '.png'].src;
		loadingScreen.innerHTML = `<img src="${imageSrc}">`
		totalImagesLoadedPercentOld = totalImagesLoadedPercent;
	}

	if (totalImagesLoaded == totalImages) {
		loadingScreen.style.display = 'none';
		switchGameState('game');
	}
}


function gameLost(){
	switchGameState('lost');
}


function gameWon(){
	switchGameState('won');
}


function removeClassesFromOverlay(){
	let overlay = document.getElementById('canvasOverlay');
	overlay.removeAttribute('class');
}


function switchGameState(state='startScreen'){
	
	switch(state){
		case 'startScreen':
			setStartScreen();
			break;
		case 'loadingScreen':
			// setLoadingScreen();
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
	}
}


function addButtons(){
	console.log('addButtons');
	
	document.getElementById('buttons').innerHTML = /*html*/`
		<img class="btn" id="btnPlay" src="assets/img/buttons/play.png" onclick="startGame()">
		<img class="btn" id="btnHelp" src="assets/img/buttons/help.png">
		<img class="btn" id="btnFullscreen" src="assets/img/buttons/fullscreenOn.png"  onclick="fullscreenOn()" >`
	}

function setStartScreen(){
	preloadLoadingScreenImages();
	addButtons();
	let overlay = document.getElementById('canvasOverlay');
	overlay.classList.add('start');
}

function setFinalScreen(result){
	let overlay = document.getElementById('canvasOverlay');
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

function youWon(){
	world.character.playWinSound();
	setTimeout(() => {
		stopAllIntervals();
		stopAllSounds();
		setFinalScreen('won');
	},1000)
}

function youLost(){
	world.character.playLostSound();
	setTimeout(() => {
		stopAllIntervals();
		stopAllSounds();
		setFinalScreen('lost');
	}, 500)
}

function restartGame(){
	stopGame()
	// stopAllIntervals();
	stopAllSounds();
	btnPlay.src = "assets/img/buttons/play.png";
	btnPlay.setAttribute('onclick','startGame()');
	startGame();
}


function stopAllIntervals(){
	for(let i=0; i<1000;i++) clearInterval(i);
}


function stopAllSounds() {
	world.level.enemies.forEach((enemy) =>
		Object.keys(enemy.soundCache).forEach((sound) => enemy.soundCache[sound].pause())
	);
}

function addListenerForGodmode(){
	document.addEventListener("keyup", (event) => {
		if (event.key === "g") toggleGodmode();
	});
}

function toggleGodmode(){
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