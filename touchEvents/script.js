function init() {

	const topHalf = document.getElementById("top-half");
	
    topHalf.addEventListener("touchstart", (event) => {
        event.preventDefault();
        console.clear();
		console.log("Touches: ", event.touches.length);
		console.log("Targets: ", event.targetTouches.length);
		console.log("Changed: ", event.changedTouches.length);
	})
}

document.addEventListener("touchstart", (event) => {

	[...event.changedTouches].forEach((touch) => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		dot.style.left = `${touch.clientX}px`;
		dot.style.top = `${touch.clientY}px`;
		dot.id = touch.identifier;
		document.body.appendChild(dot);
	});
});

document.addEventListener("touchmove", (event) => {
	[...event.changedTouches].forEach((touch) => {
		const dot = document.getElementById(touch.identifier);
		dot.style.left = `${touch.clientX}px`;
		dot.style.top = `${touch.clientY}px`;
	});
});

document.addEventListener("touchend", (event) => {
	[...event.changedTouches].forEach((touch) => {
		const dot = document.getElementById(touch.identifier);
		dot.remove();
	});
});
