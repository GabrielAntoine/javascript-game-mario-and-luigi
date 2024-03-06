import { FPS } from "./Helpers/FPS.js";
import { PlayableCharacter } from "./CanvasObjects/PlayableCharacter.js";
import { KeyboardState } from "./Helpers/KeyboardState.js";
import { Coordinates } from "./CanvasObjects/Coordinates.js";
import { Projectile } from "./CanvasObjects/Projectile.js";

const mainCanvas = document.getElementById('mainCanvas');
const mainCtx = mainCanvas.getContext('2d');

const mario = new PlayableCharacter(
    mainCanvas,
    "rgb(248, 40, 8)",
    new Coordinates(mainCanvas.width / 2 - mainCanvas.width * /*0.035*/ 0.070, mainCanvas.height - mainCanvas.height * 0.08),
    {left: 60, right: mainCanvas.width - 60 - mainCanvas.width * 0.07},
    mainCanvas.width * 0.07,
    mainCanvas.height * 0.08,
    400,
    {
        type: 'Mario',
        radius: 10,
        velocity: 2000,
        shootingKey: 'q',
        timeBetweenProjectiles: 400,
        color: "rgb(248, 40, 8)"
    }
)

const luigi = new PlayableCharacter(
    mainCanvas,
    "rgb(16, 216, 128)",
    new Coordinates(mainCanvas.width / 2, mainCanvas.height - mainCanvas.height * 0.08),
    {left: 60 + mainCanvas.width * 0.07, right: mainCanvas.width - 60},
    mainCanvas.width * 0.07,
    mainCanvas.height * 0.08,
    400,
    {
        type: 'Luigi',
        radius: 10,
        velocity: 2000,
        shootingKey: 's',
        timeBetweenProjectiles: 400,
        color: "rgb(16, 216, 128)"
    }
)

function animate() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    mario.draw();
    luigi.draw();
    Projectile.everyInstance.forEach(projectile => {
        projectile.draw();
    });

    mario.update();
    luigi.update();
    Projectile.everyInstance.forEach(projectile => {
        projectile.update();
    });


    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Debug
window.FPS = FPS;
window.KeyboardState = KeyboardState;
window.mario = mario;
// window.luigi = luigi;
window.Projectile = Projectile;