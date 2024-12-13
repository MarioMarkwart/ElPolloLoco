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
 * Adds event listeners for device-specific events such as screen orientation changes
 * and window resizing. The screen orientation listener triggers the 
 * setScreenOrientation function to handle changes, while the resize listener
 * triggers toggleHeadline to adjust elements based on window size.
*
* @returns {void}
*/
function addDeviceEventListeners() {
	screen.orientation.addEventListener("change", (event) => setScreenOrientation(event));
	window.addEventListener('resize', () => {
		toggleHeadline();
		checkIsMobile();
		toggleControlButtons()
		toggleClassMobileToMenuButton();
	});
}