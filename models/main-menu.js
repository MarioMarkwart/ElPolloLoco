/**
 * Enables fullscreen mode for the element with the ID "content".
 * 
 * This function attempts to request fullscreen mode using the appropriate
 * method for the browser, checking for compatibility with various vendor
 * prefixes. It also updates the fullscreen button's image and onclick
 * attribute to toggle fullscreen mode off when clicked.
 */
function fullscreenOn() {
	fullscreen = true;
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
	setButtonsOnFullscreen();
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
	fullscreen = false;
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
	setButtonsOnFullscreen();
}


/**
 * Adds or removes the "mobile-buttons-fullscreen" and "keyboard-keys-fullscreen"
 * CSS classes from the elements with IDs "mobile-buttons" and "keyboard-keys",
 * depending on the value of the global "fullscreen" variable.
 *
 * If fullscreen is true, the classes are added to the elements. Otherwise, the
 * classes are removed.
 *
 * This function is called whenever the game enters or exits fullscreen mode.
 */
function setButtonsOnFullscreen(){
	if(fullscreen){
		document.getElementById('mobile-buttons').classList.add('mobile-buttons-fullscreen')
		document.getElementById('keyboard-keys').classList.add('keyboard-keys-fullscreen')
	}
	else{
		document.getElementById('mobile-buttons').classList.remove('mobile-buttons-fullscreen')
		document.getElementById('keyboard-keys').classList.remove('keyboard-keys-fullscreen')
	}
}


/**
 * Opens the instruction screen and hides the content and title elements.
 * This function is called when the instruction button is clicked.
 * @returns {void}
 */
function openInstructions(){
	document.getElementById('instructions').classList.remove('d-none');
	document.getElementById('instructions').classList.add('d-flex');
	document.getElementById('content').style.display = 'none';
	document.getElementById('title').style.display = 'none';
	document.body.classList.add('bg-blur');
}


/**
 * Closes the instruction screen and shows the content and title elements again.
 * This function is called when the close button on the instruction screen is clicked.
 * @returns {void}
 */
function closeInstructions(){
	document.getElementById('instructions').classList.add('d-none');
	document.getElementById('instructions').classList.remove('d-flex');
	document.getElementById('content').style.display = 'flex';
	document.getElementById('title').style.display = 'flex';
	document.body.classList.remove('bg-blur');
}


function openPrivacy(page){
	window.open(`${page}.html`, '_blank');
}
