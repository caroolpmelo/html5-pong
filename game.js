var pong = {
  start: function () {
    this.init();
    this.run();
  },
  init: function () {
    // get a reference to the target <canvas> element.
    this.canvas = document.getElementById("game-canvas");
    if (!this.canvas) {
      throw Error("Unable to find the canvas element.");
    }

    // get a reference to the 2D drawing context.
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) {
      throw Error("Unable to get 2D draw context from the canvas");
    }

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";

    // set the welcome scene as the initial scene.
    this.setScene(this.scenes.welcome);
  },
  run: function () {
    // update and draw the current scene.
    this.scene.update();
    this.scene.draw(this.ctx);

    // perform a trivial main loop iteration.
    requestAnimationFrame(this.run.bind(this));
  },
  setScene: function (scene) {
    if (scene) {
      // perform a cleanup for the old scene (if defined).
      if (this.scene) {
        this.scene.exit();
      }

      // apply the new scene and call the scene init (reset).
      this.scene = scene;
      this.scene.enter();
    }
  },
  scenes: {
    welcome: {
      enter: function () {
        // ... scene initialization logic
      },
      exit: function () {
        // ... scene cleanup logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        // clear the current contents from the canvas.
        ctx.clearRect(0, 0, 800, 600);

        // draw the application name string.
        ctx.font = "32pt Arial";
        ctx.fillText("HTML5 PONG", 400, 100);

        // draw the controls string.
        ctx.font = "18pt Arial";
        ctx.fillText("Controls for the left player:", 400, 200)
        ctx.fillText("W and S", 400, 240);
        ctx.fillText("Controls for the right player:", 400, 300);
        ctx.fillText("UP-ARROW and DOWN-ARROW", 400, 340);

        // draw the instructions how to proceed text.
        ctx.fillText("-- Press [ENTER] to start the match --", 400, 500);
      }
    },
    court: {
      enter: function () {
        // ... scene initialization logic
      },
      exit: function () {
        // ... scene cleanup logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      }
    },
    result: {
      enter: function () {
        // ... scene initialization logic
      },
      exit: function () {
        // ... scene cleanup logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      }
    }
  }
}

pong.start();
