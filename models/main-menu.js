function init() { }

function fullscreenOn() {
	const fullscreenElement = document.getElementById("content");
	if (fullscreenElement.requestFullscreen) {
		fullscreenElement.requestFullscreen();
	} else if (fullscreenElement.mozRequestFullScreen) {
		fullscreenElement.mozRequestFullScreen();
	} else if (fullscreenElement.webkitRequestFullscreen) {
		fullscreenElement.webkitRequestFullscreen();
	} else if (fullscreenElement.msRequestFullscreen) {
		fullscreenElement.msRequestFullscreen();
	}
	btnFullscreen.src = "assets/img/buttons/fullscreenOff.png";
	btnFullscreen.setAttribute('onclick', 'fullscreenOff()');
}

function fullscreenOff() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
	btnFullscreen.src = "assets/img/buttons/fullscreenOn.png";
	btnFullscreen.setAttribute('onclick', 'fullscreenOn()');
}