function init() {}

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
        btnFullscreen.setAttribute('onclick','fullscreenOff()');
}

function fullscreenOff(){
    document.exitFullscreen();
    btnFullscreen.setAttribute('onclick','fullscreenOn()');
}