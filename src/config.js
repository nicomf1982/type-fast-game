export const phaser = {
  type: Phaser.WEBGL,
  parent: "canvas-container",
  pixelArt: true,
  width: 640,
  height: 480,
  title: "type-fast",
  scene: null,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true,
      // debugVelocityColor: 0xffff00,
      // debugBodyColor: 0x0000ff,
      // debugStaticBodyColor: 0xffffff
    }
  }
};

export const game = {
  initInterval: 5000,
  movSpeed: 1 
}