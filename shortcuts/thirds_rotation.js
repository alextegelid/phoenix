
/* EXPAND */

const thirdsRotationQueue = [
	[0, 0, 0.33, 1],
	[0.33, 0, 0.66, 1],
	[0.66, 0, 1, 1]
];

const currentThirdsRotationKeys = {};

setKeyHandler ( 'v', HYPER, () => {

	const window = Window.focused ();

	if (!currentThirdsRotationKeys[window.hash()]) {
		currentThirdsRotationKeys[window.hash()] = 0;
	}

  if ( !window ) return;

  const screen = Screen.main (),
        sFrame = screen.flippedVisibleFrame ();

	const rotationValues = thirdsRotationQueue[currentThirdsRotationKeys[window.hash()]];

	const nextFrame = {
		x: sFrame.width * rotationValues[0],
		y: sFrame.height * rotationValues[1],
		width: sFrame.width * (rotationValues[2]-rotationValues[0]),
		height: sFrame.height * (rotationValues[3]-rotationValues[1])
	};

	window.setFrame ( nextFrame );

	currentThirdsRotationKeys[window.hash()]++;
	if (currentThirdsRotationKeys[window.hash()] > thirdsRotationQueue.length-1) {
		currentThirdsRotationKeys[window.hash()] = 0;
	}
});
