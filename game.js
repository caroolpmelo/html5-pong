var pong = (function () {

  var KEY_ENTER = 13;

  var canvas;
  var canvasCenter;
  var ctx;
  var scene;

  // ==========================================================================
  /**
   * The welcoming scene for the Pong game.
   *
   * This scene is the introduction scene which will be show to the users when
   * they open the page. Scene contains the topic of the game, instructions
   * about how to move paddles with the keyboard controls and a text which
   * contains an instruction about how to start the game.
   */
  var welcomeScene = (function () {
    /** A function that is called when the game enters the scene */
    function enter() {
      document.addEventListener("keyup", onKeyUp);
    }

    /** A function that is called when the game exits the scene. */
    function exit() {
      document.removeEventListener("keyup", onKeyUp);
    }

    /** A function that is called on each main loop iteration.  */
    function update() {
      // ... no implementation required
    }

    /** A function that is called on each rendering frame iteration. */
    function draw() {
      // clear the current contents from the canvas.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw the application name string.
      ctx.font = "32pt Arial";
      ctx.fillText("HTML5 PONG", canvasCenter[0], 100);

      // draw the controls string.
      ctx.font = "18pt Arial";
      ctx.fillText("Controls for the left player:", canvasCenter[0], 200);
      ctx.fillText("W and S", canvasCenter[0], 240);
      ctx.fillText("Controls for the right player:", canvasCenter[0], 300);
      ctx.fillText("UP-ARROW and DOWN-ARROW", canvasCenter[0], 340);

      // draw the instructions how to proceed text.
      ctx.fillText("Press [ENTER] to start the match", canvasCenter[0], 500);
    }

    /**
     * A key listener to detect when a user key press is released.
     *
     * This implementation will detect only enter presses, which will trigger
     * a new state transition from the welcome scene to the court scene.
     *
     * @param {*} event A key release event from the browser.
     */
    function onKeyUp(event) {
      if (event.keyCode == KEY_ENTER) {
        setScene(courtScene);
      }
    }

    return {
      enter: enter,
      exit: exit,
      update: update,
      draw: draw
    }
  })();

  // ==========================================================================
  /**
   * The court scene for the Pong application.
   *
   * This is the main game scene where the game simulation will be processed.
   * It contains all the logics required to move game entities and to make the
   * game act as a "game". This is the biggest scene from all the three scenes.
   */
  var courtScene = (function () {

    var wallSize;
    var boxSize;

    /** A function that is called when the game enters the scene */
    function enter() {
      wallSize = [canvas.width, 20];
      boxSize = [20, 20];
    }

    /** A function that is called when the game exits the scene. */
    function exit() {
      // ...
    }

    /** A function that is called on each main loop iteration.  */
    function update() {
      // ...
    }

    /** A function that is called on each rendering frame iteration. */
    function draw() {
      // clear the current contents from the canvas.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw the top and bottom wall.
      ctx.fillRect(0, 0, wallSize[0], wallSize[1]);
      ctx.fillRect(0, (canvas.height - wallSize[1]), wallSize[0], wallSize[1]);

      // draw the center line with small boxes.
      var xPosition = (canvasCenter[0] - boxSize[0] / 2);
      for (var y = wallSize[1]; y < canvas.height; y += (1.93 * boxSize[0])) {
        ctx.fillRect(xPosition, y, boxSize[0], boxSize[1]);
      }
    }

    return {
      enter: enter,
      exit: exit,
      update: update,
      draw: draw
    }

  })();

  // ==========================================================================

  /**
   * Set the given scene as the active scene.
   *
   * Old active scene (if any) will be first exited by calling the exit
   * function so it can clean up all necessary resources as required. New
   * scene will be assigned as the active scene and the enter function will
   * be called to ensure that the new scene can initialize itself.
   *
   * @param {*} newScene A new scene to be applied as the active scene.
   */
  function setScene(newScene) {
    if (newScene) {
      // perform a cleanup for the old scene (if defined).
      if (scene) {
        scene.exit();
      }

      // apply the new scene and call the scene init (reset).
      scene = newScene;
      scene.enter();
    }
  }

  /**
   * Initialize the game.
   *
   * Initialization will ensure that the game will get a reference to the
   * 2D drawing context from the game canvas element. It also provides a
   * way to define a game wide initializations for scenes etc.
   */
  function init() {
    // get a referene to the target <canvas> element.
    canvas = document.getElementById("game-canvas");
    if (!canvas) {
      throw Error("Unable to find the required canvas element.");
    }

    // precalculate the center point of the canvas.
    canvasCenter = [];
    canvasCenter[0] = (canvas.width / 2);
    canvasCenter[1] = (canvas.height / 2);

    // get a reference to the 2D drawing context.
    ctx = canvas.getContext("2d");
    if (!ctx) {
      throw Error("Unable to get 2D draw context from the canvas.");
    }

    // specify global draw definitions.
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // set the welcome scene as the initial scene.
    setScene(welcomeScene);
  }

  function run() {
    // update and draw the current scene.
    scene.update();
    scene.draw();

    // perform a trivial main loop iteration.
    requestAnimationFrame(run);
  }

  /**
   * Start the game.
   *
   * Game will be first initialized and the started. Game will be using a
   * infinite loop (via requestAnimationFrame) as the main loop, so the game
   * will not will run until the user closes the browser tab or if an error
   * is detected by the JavaScript.
   */
  function start() {
    init();
    run();
  }

  return {
    start: start
  };
})();

pong.start();
