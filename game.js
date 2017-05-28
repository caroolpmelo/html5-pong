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

    /** The width of the small boxes used around the scene. */
    var BOX_WIDTH = 20;
    /** The height for the top and bottom walls. */
    var WALL_HEIGHT = BOX_WIDTH;
    /** The height for the left and right paddles. */
    var PADDLE_HEIGHT = 100;
    /** A constant edge offset pixels for both paddles. */
    var EDGE_OFFSET = 30;

    var background;
    var topWall;
    var bottomWall;
    var leftPaddle;
    var rightPaddle;

    /**
     * A center line entity that contains the center line boxes.
     *
     * Note that this entity is not collideable and should not be used in any
     * kind of game logic related stuff. It is only used to make the court to
     * look more like a playfield similar to tennis or other ball games.
     */
    var centerLine = (function () {

      function draw() {
        var x = (canvasCenter[0] - BOX_WIDTH / 2);
        for (var y = WALL_HEIGHT; y < canvas.height; y += (1.93 * BOX_WIDTH)) {
          ctx.fillRect(x, y, BOX_WIDTH, BOX_WIDTH);
        }
      }

      return { draw: draw };

    });


    /**
     * A wall entity that contains definitions for the top and bottom walls.
     * @param {*} x The x-coordinate of the wall position.
     * @param {*} y The y-coordinate of the wall position.
     * @param {*} width The width of the wall.
     * @param {*} height The height of the wall.
     */
    var wall = (function (x, y, width, height) {

      var position = [x, y];
      var size = [width, height];

      function draw() {
        ctx.fillRect(position[0], position[1], size[0], size[1]);
      }

      return { draw: draw };

    });

    /**
     * The paddle entity that contains definitions for a player paddle.
     * @param {*} x The x-coordinate of the paddle position.
     * @param {*} y The y-coordinate of the paddle position.
     * @param {*} width The width of the paddle.
     * @param {*} height The height of the paddle.
     */
    var paddle = (function (x, y, width, height) {

      var position = [x, y];
      var size = [width, height];

      function draw() {
        ctx.fillRect(position[0], position[1], size[0], size[1]);
      }

      return { draw: draw }

    });

    /** A function that is called when the game enters the scene */
    function enter() {
      // create a new background for the courtyard.
      background = new centerLine();

      // calculate the position and size for the top wall.
      var position = [0, 0];
      var size = [canvas.width, WALL_HEIGHT];
      topWall = wall(0, 0, canvas.width, WALL_HEIGHT);

      // calculate the position and size for the bottom wall.
      position = [0, canvas.height - WALL_HEIGHT];
      size = [canvas.width, WALL_HEIGHT];
      bottomWall = wall(position[0], position[1], size[0], size[1]);

      // calculate the position and size for the left paddle.
      position = [EDGE_OFFSET, canvasCenter[1] - (PADDLE_HEIGHT / 2)];
      size = [BOX_WIDTH, PADDLE_HEIGHT];
      leftPaddle = paddle(position[0], position[1], size[0], size[1]);

      // calculate the position and size for the right paddle.
      position[0] = (canvas.width - EDGE_OFFSET - size[0]);
      rightPaddle = paddle(position[0], position[1], size[0], size[1]);
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
      topWall.draw();
      bottomWall.draw();

      // draw the center line with small boxes.
      background.draw();

      // draw paddles.
      leftPaddle.draw();
      rightPaddle.draw();
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
    setScene(courtScene);
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
