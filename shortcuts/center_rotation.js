
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

	const [x, y, width, height] = centerRotationQueue[currentCenterRotationKeys[hash]];

	const nextFrame = {
		x: sFrame.width * x + WINDOW_GAP,
		y: sFrame.y + sFrame.height * y + WINDOW_GAP,
		width: sFrame.width * (width-x) - WINDOW_GAP * 2,
		height: sFrame.height * (height-y) - WINDOW_GAP * 2
	};

	window.setFrame(nextFrame);

	currentCenterRotationKeys[hash]++;
	if (currentCenterRotationKeys[hash] > centerRotationQueue.length-1) {
		currentCenterRotationKeys[hash] = 0;
	}

});
