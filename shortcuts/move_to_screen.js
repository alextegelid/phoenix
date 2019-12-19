
/* MOVE TO DISPLAY */

let lastMoveTimestamp = 0;

setKeyHandler ( 't', HYPER, () => {

	const timestamp = Date.now ();

  if ( timestamp - lastMoveTimestamp <= MOVE_REPEAT_INTERVAL ) {
		lastMoveTimestamp = 0;

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
		
  } else {
    lastMoveTimestamp = timestamp;
  }

});
