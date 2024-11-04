/**
 * Enables fullscreen mode for the element with the ID "content".
 * 
 * This function attempts to request fullscreen mode using the appropriate
 * method for the browser, checking for compatibility with various vendor
 * prefixes. It also updates the fullscreen button's image and onclick
 * attribute to toggle fullscreen mode off when clicked.
 */
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
	let btnFullscreen = document.getElementById('btn-fullscreen');
	btnFullscreen.src = "assets/img/buttons/fullscreenOff.png";
	btnFullscreen.setAttribute('onclick', 'fullscreenOff()');
}


/**
 * Disables fullscreen mode for the document.
 * 
 * This function attempts to exit fullscreen mode using the appropriate
 * method for the browser, checking for compatibility with various vendor
 * prefixes. It also updates the fullscreen button's image and onclick
 * attribute to toggle fullscreen mode on when clicked.
 */
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
	let btnFullscreen = document.getElementById('btn-fullscreen');
	btnFullscreen.src = "assets/img/buttons/fullscreenOn.png";
	btnFullscreen.setAttribute('onclick', 'fullscreenOn()');
}