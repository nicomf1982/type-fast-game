import {Scene} from 'phaser'
import { phaser as config } from "../../config";
import bgNebulaRed from "../../assets/background/Nebula Red.png"
import bgStarsBig from "../../assets/background/Stars_Big_1_2_PC.png";
import bgStarsSmall from "../../assets/background/Stars_Small_2.png";

class PauseMenu extends Scene {
  constructor(){
    super({
      key: "PauseMenu"
    });
    this.btnReset
    this.scorePlayer
  }

  init(data) {
    console.log(data)
    this.scorePlayer = data.score
  }

  preload(){
    // none
  }

  create(){
    // Get the window sizes
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Find the center of the top space
    let topBackgroundXOrigin = windowWidth / 2;
    let topBackgroundYOrigin = (windowHeight / 5) * 1.5;
    let topBackgroundHeight = (windowHeight / 5) * 3;

    // Base width and height of the images
    let imageBaseWidth = 1920;
    let imageBaseHeight = 1080;
    let heightRatio = topBackgroundHeight / imageBaseHeight;
    
    let bg = this.add.image(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      "bgNebulaRed"
    );
    bg.setDisplaySize(windowWidth, topBackgroundHeight);

    this.cloud1 = this.add.tileSprite(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      imageBaseWidth, 
      imageBaseHeight,
      "bgStarsBig2"
    );
    this.cloud1.setScale(heightRatio);

    this.cloud2 = this.add.tileSprite(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      imageBaseWidth,
      imageBaseHeight,
      "bgStarsSmall2"
    );
    this.cloud2.setScale(heightRatio);

    const middleScreenY = this.cameras.main.height / 2;
    const middleScreenX = this.cameras.main.width / 2;

    const finalScore = this.add.text(
      0, 0, "score Total: " + this.scorePlayer,
      {
        fontSize: "32px",
        fill: "#FFF"
      });
    finalScore.setPosition(middleScreenX - (finalScore.width / 2), 200)
    
    const playAgainTxt = this.add.text(
      0, 0, "Press Enter to Main Menu",
      {
        fontSize: "32px",
        fill: "#FFF"
      });
    playAgainTxt.setPosition(middleScreenX - (playAgainTxt.width / 2), 300)
    
    this.input.keyboard.on("keydown-ENTER", listener => {
      this.scene.start("game");
    });
  }

  update(){
      this.cloud1.tilePositionX += 0.65;
      this.cloud2.tilePositionX += 0.15;
  }
}

export default PauseMenu