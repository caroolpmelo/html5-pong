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

    // set the welcome scene as the initial scene.
    this.setScene(this.scenes.welcome);
  },
  run: function () {
    this.scene.update();
    this.scene.draw(this.ctx);
  },
  setScene: function (scene) {
    if (scene) {
      this.scene = scene;
      this.scene.enter();
    }
  },
  scenes: {
    welcome: {
      enter: function () {
        // ... scene initialization logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        // ... scene draw logic
      }
    },
    court: {
      enter: function () {
        // ... scene initialization logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        // ... scene draw logic
      }
    },
    result: {
      enter: function () {
        // ... scene initialization logic
      },
      update: function () {
        // ... scene update logic
      },
      draw: function (ctx) {
        // ... scene draw logic
      }
    }
  }
}

pong.start();
