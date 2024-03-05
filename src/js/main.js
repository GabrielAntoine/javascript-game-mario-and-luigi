import { FPS } from "./FPS.js";
import { PlayableCharacter } from "./PlayableCharacter.js";
import { KeyboardState } from "./KeyboardState.js";
import { Coordinates } from "./Coordinates.js";

FPS.start();
KeyboardState.start();

const mainCanvas = document.getElementById('mainCanvas');

const mario = new PlayableCharacter(
    mainCanvas,
    "rgb(248, 40, 8)",
    new Coordinates(mainCanvas.width / 2 - mainCanvas.width * 0.035, mainCanvas.height * 0.88),
    {left: 60, right: mainCanvas.width - 60},
    mainCanvas.width * 0.07,
    mainCanvas.height * 0.08,
    400
)

// const mario = new PlayableCharacter(
//     mainCanvas,
//     "rgb(248, 40, 8)",
//     new Coordinates(null, mainCanvas.height * 0.88),
//     {left: 60, right: null},
//     mainCanvas.width * 0.07,
//     mainCanvas.height * 0.08,
//     400
// );

// const luigi = new PlayableCharacter(
//     mainCanvas,
//     "rgb(16, 216, 128)",
//     new Coordinates(null, mario.position.y),
//     {left: mario.limit.left + mario.width, right: mainCanvas.width - 60},
//     mario.width,
//     mario.height,
//     mario.velocity
// );

// mario.limit.right = luigi.limit.right - luigi.width;
// mario.position.x = mainCanvas.width / 2 - mainCanvas.width * 0.035 - luigi.width / 2;
// luigi.position.x = mario.position.x + mario.width;

function animate() {
    mario.clear();
    // luigi.clear();

    mario.draw();
    // luigi.draw();

    mario.update();
    // luigi.update();


    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Debug
window.FPS = FPS;
window.KeyboardState = KeyboardState;
window.mario = mario;
window.luigi = luigi;