
/* MOVE TO DISPLAY */

setKeyHandler ( 't', HYPER, () => {

	const timestamp = Date.now ();

	const window = Window.focused();
	const currentScreen = window.screen();
	const nextScreen = currentScreen.next();
	const nextFrame = nextScreen.flippedVisibleFrame();

	var nextFrameXOffset = nextFrame['x'];
	var nextFrameYOffset = nextFrame['y'];

	window.setFrame({
		x: nextFrameXOffset,
		y: nextFrameYOffset,
		width: nextFrame.width,
		height: nextFrame.height
	});

});
