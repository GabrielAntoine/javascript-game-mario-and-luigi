import { FPS } from "./Helpers/FPS.js";
import { PlayableCharacter } from "./CanvasObjects/PlayableCharacter.js";
import { KeyboardState } from "./Helpers/KeyboardState.js";
import { Coordinates } from "./CanvasObjects/Coordinates.js";
import { Projectile } from "./CanvasObjects/Projectile.js";
import { LinearMotion } from "./MotionManagement/LinearMotion.js";
import { MovingCircle } from "./CanvasObjects/MovingCircle.js";
import { CircularMotion } from "./MotionManagement/CircularMotion.js";
import { WaitMotion } from "./MotionManagement/WaitMotion.js";
import { MotionsPattern } from "./MotionManagement/MotionsPattern.js";
import { DocumentVisibilityTime } from "./Helpers/DocumentVisibilityTime.js";

const mainCanvas = document.getElementById('mainCanvas');
const mainCtx = mainCanvas.getContext('2d');

const CANVAS_HEIGHT_RATIO_TO_SCREEN = 0.80;
const CANVAS_ASPECT_RATIO = 4 / 3;

mainCanvas.height = screen.height * CANVAS_HEIGHT_RATIO_TO_SCREEN;
mainCanvas.width = mainCanvas.height * CANVAS_ASPECT_RATIO; 

window.addEventListener('resize', () => {
    console.log('resizing');
    mainCanvas.height = screen.height * CANVAS_HEIGHT_RATIO_TO_SCREEN;
    mainCanvas.width = mainCanvas.height * CANVAS_ASPECT_RATIO;
})

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

const circle = new MovingCircle(mainCanvas, 'lime', new Coordinates(800, 400), 10, 100);

const motionA1 = new LinearMotion(300, circle.staticVelocity, - Math.PI);
const motionB1 = new WaitMotion(4000);
const motionC1 = new CircularMotion(3 * Math.PI * 50, circle.staticVelocity, 50, motionA1.direction + Math.PI/2, false);

const motionsPattern = new MotionsPattern([motionA1, motionB1, motionC1]);

const circle2 = new MovingCircle(mainCanvas, 'teal', new Coordinates(300, 300), 15, 100);
const circle3 = new MovingCircle(mainCanvas, 'pink', new Coordinates(300, 300), 15, 100);
const circle4 = new MovingCircle(mainCanvas, 'yellow', new Coordinates(300, 300), 15, 100);

const motionsPattern2 = new MotionsPattern([
    new LinearMotion(250, circle2.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle2.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle2.staticVelocity, - Math.PI / 8),
    new WaitMotion(1500),
    new CircularMotion(Infinity, circle2.staticVelocity, 30, 0, true)
]);

const motionsPattern3 = new MotionsPattern([
    new WaitMotion(40 / circle2.staticVelocity * 1000),
    new LinearMotion(250, circle2.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle2.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle2.staticVelocity, - Math.PI / 8),
    new WaitMotion(1500),
    new CircularMotion(Infinity, circle2.staticVelocity, 30, 0, true)
]);

const motionsPattern4 = new MotionsPattern([
    new WaitMotion(40 / circle2.staticVelocity * 2 * 1000),
    new LinearMotion(250, circle2.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle2.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle2.staticVelocity, - Math.PI / 8),
    new WaitMotion(1500),
    new CircularMotion(Infinity, circle2.staticVelocity, 30, 0, true)
]);

function animate() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

    Projectile.everyInstance.forEach(projectile => {
        projectile.draw();
    });
    mario.draw();
    luigi.draw();
    circle.draw();
    circle2.draw();
    circle3.draw();
    circle4.draw();
    mario.update();
    luigi.update();

    // debugger;
    if (!motionsPattern.hasReachedEnd) {
        motionsPattern.move();
        motionsPattern.mergePositions(circle.initialPosition, circle.position);
    }

    if (!motionsPattern2.hasReachedEnd) {
        motionsPattern2.move();
        motionsPattern2.mergePositions(circle2.initialPosition, circle2.position);
    }

    if (!motionsPattern3.hasReachedEnd) {
        motionsPattern3.move();
        motionsPattern3.mergePositions(circle3.initialPosition, circle3.position);
    }

    if (!motionsPattern4.hasReachedEnd) {
        motionsPattern4.move();
        motionsPattern4.mergePositions(circle4.initialPosition, circle4.position);
    }

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
window.DocumentVisibilityTime = DocumentVisibilityTime;