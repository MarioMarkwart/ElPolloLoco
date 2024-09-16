let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);

	console.log("My world is: ", world);
	console.log("My character is: ", world.character);
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
	btnPlay.src = "assets/img/buttons/restart.png";
	btnPlay.setAttribute('onclick','restartGame()');
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