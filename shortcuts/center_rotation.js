
/* EXPAND */

const centerRotationQueue = [
	[0, 0, 1, 1],
	[0.2, 0.15, 0.8, 0.85],
	[0.2, 0, 0.8, 1]
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

	const rotationValues = centerRotationQueue[currentCenterRotationKeys[hash]];

	const nextFrame = {
		x: sFrame.width * rotationValues[0],
		y: sFrame.height * rotationValues[1],
		width: sFrame.width * (rotationValues[2]-rotationValues[0]),
		height: sFrame.height * (rotationValues[3]-rotationValues[1])
	};

	window.setFrame(nextFrame);

	currentCenterRotationKeys[hash]++;
	if (currentCenterRotationKeys[hash] > centerRotationQueue.length-1) {
		currentCenterRotationKeys[hash] = 0;
	}

});
