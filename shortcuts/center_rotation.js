
/* CENTER ROTATION */

const centerRotationQueue = [
	[0, 0, 1, 1],
	[0.15, 0.1, 0.7, 0.80],
	[0.15, 0, 0.7, 1]
];

const centerRotationQueueUltraWide = [
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

	// Check if the window is ultra wide and select rotationQueue accordingly
	const isUltraWide = sFrame.width / sFrame.height > 2;
	const rotationQueue = isUltraWide ? centerRotationQueueUltraWide : centerRotationQueue;

	// If the next rotation doesn't exist due to having changed screens (resolution) then reset to 0
	if (!rotationQueue[currentCenterRotationKeys[hash]]) {
		currentCenterRotationKeys[hash] = 0;
	}

	// Extract the values from the array.
	const [origX, origY, origWidth, origHeight] = rotationQueue[currentCenterRotationKeys[hash]];

	// Calculate new frame.
	// Use percentage of screen size if the value is between 0 and 1.
	// Otherwise use the value as is.
	const x = origX <= 1 ? origX * sFrame.width : origX;
	const y = origY <= 1 ? origY * sFrame.height : origY;
	const width = origWidth <= 1 ? origWidth * sFrame.width : origWidth;
	const height = origHeight <= 1 ? origHeight * sFrame.height : origHeight;

	// Set the new frame.
	const nextFrame = {
		x: sFrame.x + x,
		y: sFrame.y + y,
		width: width,
		height: height
	};
	window.setFrame(nextFrame);

	currentCenterRotationKeys[hash]++;
	if (currentCenterRotationKeys[hash] > rotationQueue.length-1) {
		currentCenterRotationKeys[hash] = 0;
	}

});
