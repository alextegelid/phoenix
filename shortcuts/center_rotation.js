
/* EXPAND */

const centerRotationQueue = [
	[0.1, 0.1, 0.5, 0.85],
	[0.1, 0, 0.5, 1],
	[0, 0, 0.6666, 1],
	[0, 0, 1, 1],
];

const currentCenterRotationKeys = {};

setKeyHandler ( 'c', HYPER, () => {

	const window = Window.focused();
	if ( !window ) return;

	const screen = window.screen();
	const hash = window.hash();

	if (!currentCenterRotationKeys[hash]) {
		currentCenterRotationKeys[hash] = 0;
	}

	const sFrame = screen.flippedVisibleFrame();

	// Extract the values from the array.
	const [origX, origY, origWidth, origHeight] = centerRotationQueue[currentCenterRotationKeys[hash]];

	// Calculate new frame.
	// Use percentage of screen size if the value is between 0 and 1.
	// Otherwise use the value as is.
	const x = origX <= 1 ? origX * sFrame.width : origX;
	const y = origY <= 1 ? origY * sFrame.height : origY;
	const width = origWidth <= 1 ? origWidth * sFrame.width : origWidth;
	const height = origHeight <= 1 ? origHeight * sFrame.height : origHeight;

	// Set the new frame.
	const nextFrame = {
		x: x,
		y: y,
		width: width,
		height: height
	};
	window.setFrame(nextFrame);

	currentCenterRotationKeys[hash]++;
	if (currentCenterRotationKeys[hash] > centerRotationQueue.length-1) {
		currentCenterRotationKeys[hash] = 0;
	}

});
