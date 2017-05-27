var pong = {
  canvas: undefined,
  ctx: undefined,
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
  },
  run: function () {
    // ...
    this.ctx.fillRect(0,0,800,600);
  }
}

pong.start();
