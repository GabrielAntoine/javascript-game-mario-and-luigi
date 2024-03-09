import { FPS } from "./Helpers/FPS.js";
import { PlayableCharacter } from "./CanvasObjects/PlayableCharacter.js";
import { KeyboardState } from "./Helpers/KeyboardState.js";
import { Coordinates } from "./Coordinates/Coordinates.js";
import { Projectile } from "./CanvasObjects/Projectile.js";
import { LinearMotion } from "./MotionManagement/LinearMotion.js";
import { MovingCircle } from "./CanvasObjects/MovingCircle.js";
import { CircularMotion } from "./MotionManagement/CircularMotion.js";
import { StaticMotion } from "./MotionManagement/StaticMotion.js";
import { CompoundMotion } from "./MotionManagement/CompoundMotion.js";
import { SmoothSinusoidalMotion } from "./MotionManagement/SmoothSinusoidalMotion.js";
import { SinusSignal } from "./MotionManagement/SinusSignal.js";

const mainCanvas = document.getElementById('mainCanvas');
const mainCtx = mainCanvas.getContext('2d');

const CANVAS_HEIGHT_RATIO_TO_SCREEN = 0.80;
const CANVAS_ASPECT_RATIO = 4 / 3;

mainCanvas.height = screen.height * CANVAS_HEIGHT_RATIO_TO_SCREEN;
mainCanvas.width = mainCanvas.height * CANVAS_ASPECT_RATIO; 

window.addEventListener('resize', () => {
    mainCanvas.height = screen.height * CANVAS_HEIGHT_RATIO_TO_SCREEN;
    mainCanvas.width = mainCanvas.height * CANVAS_ASPECT_RATIO;
});



window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // FPS.stop();
    } else {
        // FPS.start();
    }
});

const mario = new PlayableCharacter(
    mainCanvas,
    "rgb(248, 40, 8)",
    new Coordinates(mainCanvas.width / 2 - mainCanvas.width * /*0.035*/ 0.070, mainCanvas.height - mainCanvas.height * 0.08),
    {left: 60, right: mainCanvas.width - 60 - mainCanvas.width * 0.07},
    mainCanvas.width * 0.07,
    mainCanvas.height * 0.08,
    400,
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: 'Mario',
        radius: 10,
        velocity: 2000,
        shootingKeys: ['KeyA'],
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
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: 'Luigi',
        radius: 10,
        velocity: 2000,
        shootingKeys: ['KeyS'],
        timeBetweenProjectiles: 400,
        color: "rgb(16, 216, 128)"
    }
)

const circle = new MovingCircle(mainCanvas, 'lime', new Coordinates(800, 400), 10, 100);
let circleDelay = 1200;

const motionA1 = new LinearMotion(300, circle.staticVelocity, - Math.PI);
const motionB1 = new StaticMotion(4 * circle.staticVelocity, circle.staticVelocity * 9999);
const motionC1 = new CircularMotion(3 * Math.PI * 50, circle.staticVelocity, 50, motionA1.direction + Math.PI/2, false);

const motionsPattern = new CompoundMotion([motionA1, motionB1, motionC1]);

const circle2 = new MovingCircle(mainCanvas, 'teal', new Coordinates(300, 300), 15, 100);
const circle3 = new MovingCircle(mainCanvas, 'pink', new Coordinates(300, 300), 15, 100);
let circle3Delay = circle2.radius + circle3.radius + 15;
const circle4 = new MovingCircle(mainCanvas, 'yellow', new Coordinates(300, 300), 15, 100);
let circle4Delay = circle3Delay + circle3.radius + circle4.radius + 15;

const motionsPattern2 = new CompoundMotion([
    new LinearMotion(250, circle2.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle2.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle2.staticVelocity, - Math.PI / 8),
    new StaticMotion(1.5 * circle2.staticVelocity, circle2.staticVelocity),
    new CircularMotion(Infinity, circle2.staticVelocity, 30, 0, false)
]);

const motionsPattern3 = new CompoundMotion([
    new StaticMotion(40, circle3.staticVelocity),// / circle3.staticVelocity * 1000),
    new LinearMotion(250, circle3.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle3.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle3.staticVelocity, - Math.PI / 8),
    new StaticMotion(1.5 * circle3.staticVelocity, circle3.staticVelocity),
    new CircularMotion(Infinity, circle3.staticVelocity, 30, 0, false)
]);

const motionsPattern4 = new CompoundMotion([
    // new StaticMotion(80, circle4.staticVelocity),
    new LinearMotion(250, circle4.staticVelocity, - Math.PI / 8),
    new LinearMotion(250, circle4.staticVelocity, 9 * Math.PI / 8),
    new LinearMotion(125, circle4.staticVelocity, - Math.PI / 8),
    new StaticMotion(1.5 * circle4.staticVelocity, circle4.staticVelocity),
    new CircularMotion(Infinity, circle4.staticVelocity, 30, 0, false)
]);

const circle5 = new MovingCircle(mainCanvas, '#DBFC77', new Coordinates(500, mainCanvas.height / 2), 20, 100);
let circle5Delay = circle5.staticVelocity * 3;
const motionD = new SmoothSinusoidalMotion(800, circle5.staticVelocity, new SinusSignal(200, 0.0025, 0), - Math.PI / 4);
// debugger;

const circle6 = new MovingCircle(mainCanvas, '#D65E48', new Coordinates(1000, 100), 15, 50);
const circle7 = new MovingCircle(mainCanvas, '#4DF27B', new Coordinates(1000, 100), 30, 50);
let circle6Delay = circle7.radius + circle6.radius;
const motionE = new LinearMotion(500, circle6.staticVelocity, - Math.PI / 2);

const circle8 = new MovingCircle(mainCanvas, '#F7326A', new Coordinates(mainCanvas.width / 2, 0), 25, 18);
let circle8Delay = 200;
const sinusConfig = new SinusSignal(mainCanvas.width * 0.40, 1 / (mainCanvas.height / 10), 0);
const sinusConfig2 = new SinusSignal(mainCanvas.width * 0.40, 1 / (mainCanvas.height / 10), Math.PI);
const motionsPattern5 = new CompoundMotion([
    new SmoothSinusoidalMotion(sinusConfig.period * 2, circle8.staticVelocity, sinusConfig, - Math.PI / 2),
    new SmoothSinusoidalMotion(sinusConfig2.period * 8, circle8.staticVelocity, sinusConfig2, - Math.PI/2)
]);

const circle9 = new MovingCircle(mainCanvas, '#30F0E5', new Coordinates(200, 700), 15, 50);
let circle9Delay = 300;
const motionF = new LinearMotion(200, circle9.staticVelocity, 0);

const circle10 = new MovingCircle(mainCanvas, '#EFA94A', new Coordinates(1000, 800), 15, 100);
let circle10Delay = 800;
const motionG = new StaticMotion(2 * circle10.staticVelocity, circle10.staticVelocity);

const circlesVelocity = 1000;
const circle11 = new MovingCircle(mainCanvas, '#FAD201', new Coordinates(mainCanvas.width / 4, -50), 15, circlesVelocity);
const circle12 = new MovingCircle(mainCanvas, '#84C3BE', new Coordinates(mainCanvas.width / 4, -50), 15, circlesVelocity);
const circle13 = new MovingCircle(mainCanvas, '#DE4C8A', new Coordinates(mainCanvas.width / 4, -50), 15, circlesVelocity);
let circle12Delay = circle11.radius + circle12.radius + 10;
let circle13Delay = circle12Delay + circle11.radius + circle13.radius + 10;

const compoundMotion = new CompoundMotion([
    new LinearMotion(mainCanvas.height / 2 - circle11.position.y, circlesVelocity, - Math.PI / 2),
    new CircularMotion(2 * Math.PI * 50, circlesVelocity, 50, 0, true),
    new LinearMotion(mainCanvas.height / 2, circlesVelocity, - Math.PI / 2),
]);

compoundMotion.attach(circle11.position, 0);
compoundMotion.attach(circle12.position, circle12Delay);
compoundMotion.attach(circle13.position, circle13Delay);

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
    circle5.draw();
    circle7.draw();
    circle6.draw();
    circle8.draw();
    circle9.draw();
    circle10.draw();
    circle11.draw();
    circle12.draw();
    circle13.draw();
    mario.update();
    luigi.update();

    // debugger;
    if (!motionsPattern.hasReachedEnd || circleDelay !== null) {
        motionsPattern.move();
        circleDelay = motionsPattern.mergePositions(circle.initialPosition, circle.position, circleDelay);
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
        motionsPattern4.mergePositions(circle4.initialPosition, circle4.position, circle4Delay);
    }

    if (!motionD.hasReachedEnd || circle5Delay !== null) {
        motionD.move();
        circle5Delay = motionD.mergePositions(circle5.initialPosition, circle5.position, circle5Delay);
    }

    if (!motionE.hasReachedEnd || circle6Delay !== null) {
        motionE.move();
        motionE.mergePositions(circle7.initialPosition, circle7.position);
        circle6Delay = motionE.mergePositions(circle6.initialPosition, circle6.position, circle6Delay);
    }
    
    if (!motionsPattern5.hasReachedEnd || circle8Delay !== null) {
        motionsPattern5.move();
        circle8Delay = motionsPattern5.mergePositions(circle8.initialPosition, circle8.position, circle8Delay);
    }

    if (!motionF.hasReachedEnd || circle9Delay !== null) {
        motionF.move();
        circle9Delay = motionF.mergePositions(circle9.initialPosition, circle9.position, circle9Delay);
    }

    if (!motionG.hasReachedEnd || circle10Delay !== null) {
        motionG.move();
        circle10Delay = motionG.mergePositions(circle10.initialPosition, circle10.position, circle10Delay);
    } else {
        circle10.color = '#9D9101';
    }

    if (!compoundMotion.hasEverybodyReachedEnd) {
        compoundMotion.move();
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
window.Coordinates = Coordinates;

window.a = new Coordinates(0, 0);
window.b = new Coordinates(1, 1);

window.circle = circle;
window.circle5 = circle5
window.circle6 = circle6;
window.circle7 = circle7;
window.circle8 = circle8;
window.circle11 = circle11;
window.circle12 = circle12;
window.circle13 = circle13;
window.motionsPattern5 = motionsPattern5;
window.compoundMotion = compoundMotion;
window.motionD = motionD;
window.motionC1 = motionC1;