import Phaser, { Scene } from 'phaser'
import { game,  phaser as config } from "../../config";
import hyperdrive from "../../assets/fonts/retro/hyperdrive.png"
import hyperdriveXML from "../../assets/fonts/retro/hyperdrive.xml"
import topaz from "../../assets/fonts/retro/topaz.png"
import topazXML from "../../assets/fonts/retro/topaz.xml"
import bgNebulaAquaPink from "../../assets/background/Nebula_Aqua_Pink.png";
import bgNebulaRed from "../../assets/background/Nebula Red.png";
import bgStarsBig2 from "../../assets/background/Stars_Big_1_2_PC.png";
import bgStarsSmall2 from "../../assets/background/Stars_Small_2.png";
import englishWords from "../../assets/nouns.json"

class Game extends Scene {
  constructor() {
    super("game");
    this.scrollers;
    this.lastMarkedTime;
    this.scoreText;
    this.score;
    this.levelText;
    this.level;
    this.keyboardInput;
    this.inputWord;
    this.timedEvent;
    this.height;
    this.width;
    this.words;
    this.wordsOnScreen;
    this.isStarted;
    this.finishLine;
    this.addNewWord = this.addNewWord.bind(this);
    this.compareWord = this.compareWord.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  compareWord() {
    this.scrollers.children.iterate((child, index) => {
      if (child && child.text.trim() == this.keyboardInput.toUpperCase()) {
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        this.scrollers.remove(child, true, true);
      }
    });
    this.keyboardInput = "";
    this.inputWord.setText("Word: " + this.keyboardInput);
  }

  addNewWord() {
    const randomWord = this.words.pop();
    if (randomWord) {
      this.wordsOnScreen.push(randomWord);
      const randomY = 50 + Math.floor(Math.random() * (this.height - 140));
      const t = this.add.dynamicBitmapText(
        0,
        randomY,
        "topazFont",
        "                                               " + randomWord,
        32,
      );
      this.scrollers.add(t);
    }
  }

  endGame() {
    this.scene.start("PauseMenu", { score: this.score });
  }

  restartGame() {
    this.scene.restart();
  }

  preload() {
    this.lastMarkedTime = 0;
    this.score = 0;
    this.keyboardInput = "";
    this.wordsOnScreen = [];
    this.level = 1;
    this.isStarted = false
    this.words;
    this.height = this.cameras.main.height
    this.width =  this.cameras.main.width
    this.load.bitmapFont("hyperdriveFont", hyperdrive, hyperdriveXML);
    this.load.bitmapFont("topazFont",topaz, topazXML);
    this.load.image("bgNebulaAquaPink", bgNebulaAquaPink);
    this.load.image("bgNebulaRed", bgNebulaRed);
    this.load.image("bgStarsBig2", bgStarsBig2);
    this.load.image("bgStarsSmall2", bgStarsSmall2);
    this.load.json("wordsAPI", englishWords);

    this.load.on("progress", function(value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((width / 2 )- 150, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function(file) {
    });

    this.load.on("complete", function() {
      console.log("loading complete...");
      loadingText.destroy();
      percentText.destroy();
    });

    // --- Loading --- //
    var width = this.width;
    var height = this.height;

    // Loading bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((width / 2) - 160, 270, 320, 50);
    // Loading text
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // Loading percent
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);
   
  }

  create() {
    // Fetch random words
    this.words = this.cache.json.get("wordsAPI").nouns
      .sort(() => Math.random() - 0.5)
      .map(w => w.toUpperCase())
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
    // Add the sky image at the right location and resize it to take all the space, no scaling needed
    let skyImage = this.add.image(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      "bgNebulaAquaPink"
    );
    skyImage.setDisplaySize(windowWidth, topBackgroundHeight);

    // Add each layer one by one
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
    
    // --- Text into screen --- //
    // Score
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#FFF"
    });
    // Level
    this.levelText = this.add.text(0, 0, "Level: " + this.level, {
      fontSize: "32px",
      fill: "#FFF"
    });
    this.levelText.setPosition(
      this.width - (this.levelText.width + 16), 16
    );
    // Input word
    let graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 0.5);
    graphics.fillRect(0, this.height - 40, this.width, 40);
    this.inputWord = this.add.text(16, this.height - 38, "Word:", {
      fontSize: "32px",
      fill: "#FFF"
    });

    this.scrollers = this.physics.add.group();
    
    // Add events to handle the input keyaboard
    this.input.keyboard.on("keydown", (eventName, event) => {
      if (eventName.key === "Enter") {
        return this.compareWord();
      }
      if (eventName.key === "Backspace") {
        let beforeWord = this.keyboardInput.substring(
          0,
          this.keyboardInput.length - 1
        );
        this.keyboardInput = beforeWord;
        this.inputWord.setText("Word: " + beforeWord);
      }
      if (eventName.key.match(/^[A-Za-z]{1}$/)) {
        this.keyboardInput += eventName.key;
        this.inputWord.setText("Word: " + this.keyboardInput);
      }
    });
    
    // Vertical line, if a word get this position, the game is over
    this.finishLine = this.add.line(60, this.height / 2, 0, 0, 0, 350, 0xaa00aa, 1 );
    
    // --- Main Menu --- //
    const mainMenuGroup = this.add.group()
    const middleScreenY = config.height / 2
    const middleScreenX = config.width / 2
    
    // Menu title
    const title = this.add.bitmapText(400, 100, "hyperdriveFont", "Type Fast!!");
    title.fontSize = 100
    title.setPosition(middleScreenX - (title.width / 2), 100);

    // Press start
    const startGameTxt = this.add.text(400, 400, "Press Enter to Play", {
      fontSize: "32px",
      fill: "#FFF",
    });
    startGameTxt.setPosition(middleScreenX - (startGameTxt.width / 2), 300);
    this.input.keyboard.on("keydown-ENTER", (listener) => {
      this.isStarted = true;
      mainMenuGroup.clear(true, true);
    });
    mainMenuGroup.addMultiple([title, startGameTxt]);
  }

  update(time, delta) {
    // Move background
    this.cloud1.tilePositionX += 0.65;
    this.cloud2.tilePositionX += 0.15;
    
    // The game ends, if no words on screens and no words left in the word's array
    if(this.isStarted) {
      if(!this.words.length && !this.scrollers.children.size){
        this.endGame();
      }
      // Add new words in a time interval
      let timeRef =
        game.initInterval - this.score * 10 >= 0
          ? game.initInterval - this.score * 10
          : 0;
      if (time - this.lastMarkedTime > timeRef) {
        this.addNewWord();
        this.lastMarkedTime = time;
      }
      // Move the words over the scene
      this.scrollers.children.iterate((child, index) => {
        child.scrollX += game.movSpeed + Math.sin(0.01 * index * delta);
        if (child.scrollX > 2800) {
          child.scrollX = -200;
        }
        // if a word reach this position, the game ends too
        if (child.scrollX >= 1400) {
          this.endGame();
        }
      });
    }
  }
}

export default Game