let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
	console.log("My world is: ", world);
	console.log("My character is: ", world.character);
	switchGameState('startScreen')
}

function setStoppableInterval(fn, time) {
	let id = setInterval(fn, time);
	this.intervalIds.push(id);
}

function stopGame() {
	this.intervalIds.forEach((id) => clearInterval(id));
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


function startGame(){
	initLevel();
	init();
	switchGameState('game');
	btnPlay.src = "assets/img/buttons/restart.png";
	btnPlay.setAttribute('onclick','restartGame()');
}

function gameLost(){
	switchGameState('lost');
}

function gameWon(){
	switchGameState('won');
}
function switchGameState(state='startScreen'){
	switch(state){
		case 'startScreen':
			setStartScreen();
			break;
		case 'game':
			setGameScreen();
			break;
		case 'won':
			setFinalScreen('won');
			break;
			case 'lost':
			setFinalScreen('lost');
			break;
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
	addButtons();
	let overlay = document.getElementById('canvasOverlay');
	overlay.classList.remove('d-none')
	overlay.innerHTML = '<img src="assets/img/9_intro_outro_screens/start/startscreen_1.png" width="720px" height="480px">';
}

function setGameScreen(){
	let overlay = document.getElementById('canvasOverlay');
	overlay.innerHTML = '';
}

function setFinalScreen(result){
	let overlay = document.getElementById('canvasOverlay');
	overlay.classList.remove('d-none');
	if (result === 'won'){
		overlay.innerHTML = '<img src="assets/img/9_intro_outro_screens/win/won_2.png" width="720px" height="480px" alt="you won">';

	}
	if (result === 'lost'){
		overlay.innerHTML = '<img src="assets/img/9_intro_outro_screens/game_over/oh no you lost!.png" width="720px" height="480px" alt="you lost">';
		setTimeout(() => {
			overlay.innerHTML = '<img src="assets/img/9_intro_outro_screens/game_over/game over!.png" width="720px" height="480px" alt="game over">';
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
	stopAllIntervals();
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