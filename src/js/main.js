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
import { GamesBall } from "./CanvasObjects/GamesBall.js";
import { InstancesManager } from "./Helpers/InstancesManager.js";
import { EnergyBall } from "./CanvasObjects/EnergyBall.js";

const mainCanvas = document.getElementById('mainCanvas');
const mainCtx = mainCanvas.getContext('2d');

const CANVAS_HEIGHT_RATIO_TO_SCREEN = 0.80;
const CANVAS_ASPECT_RATIO = 4 / 3;
const LUIGI_ENERGYBALL_COLOR = '#52D701'; 
const MARIO_ENERGYBALL_COLOR = '#F80008'; 
const BOTH_ENERGYBALL_COLOR = '#117ADF';

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
    new Coordinates(mainCanvas.width / 2 - mainCanvas.width * /*0.035*/ 0.080, mainCanvas.height - mainCanvas.height * 0.08),
    {left: 60, right: mainCanvas.width - 60 - mainCanvas.width * 0.08},
    mainCanvas.width * 0.08,
    mainCanvas.height * 0.08,
    1200,
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: 'Mario',
        radius: 20,
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
    {left: 60 + mainCanvas.width * 0.08, right: mainCanvas.width - 60},
    mainCanvas.width * 0.08,
    mainCanvas.height * 0.08,
    1200,
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: 'Luigi',
        radius: 20,
        velocity: 2000,
        shootingKeys: ['KeyD'],
        timeBetweenProjectiles: 400,
        color: "rgb(16, 216, 128)"
    }
);

(() => {
    const compoundMotion2 = new CompoundMotion([
        new LinearMotion(mainCanvas.height / 2 - -50, 300, - Math.PI / 2),
        new CircularMotion(2 * Math.PI * 133, 300, 133, 0, true),
        new LinearMotion(mainCanvas.height / 2 + 50, 300, - Math.PI / 2)
    ]);
    
    const initialPosition = new Coordinates(mainCanvas.width / 2, -50);
    for (let i = 0; i < 8; i++) {
        const color = Math.floor(Math.random() * 2) ? LUIGI_ENERGYBALL_COLOR : MARIO_ENERGYBALL_COLOR;
        new EnergyBall(mainCanvas, color, new Coordinates().copy(initialPosition), 40, 2, compoundMotion2, 100 * i);
    }
})();

(() => {
    const compoundMotion2 = new CompoundMotion([
        new LinearMotion(mainCanvas.height / 2 - -50, 300, - Math.PI / 2),
        new StaticMotion(1),
        new LinearMotion(mainCanvas.height / 2 + 50, 300, - Math.PI / 2)
    ]);
    
    for (let i = 0; i < 8; i++) {
        const color = Math.floor(Math.random() * 2) ? LUIGI_ENERGYBALL_COLOR : MARIO_ENERGYBALL_COLOR;
        new EnergyBall(mainCanvas, color, new Coordinates(mainCanvas.width * 0.075 + (i * 2 + 1) * mainCanvas.width * 0.85 / 16, -50), 40, 2, compoundMotion2, 2500);
    }
})();

(() => {
    const compoundMotion2 = new CompoundMotion([
        new LinearMotion(mainCanvas.height / 16 - -50, 600, -Math.PI / 2),
        new SmoothSinusoidalMotion(7 * mainCanvas.height / 16, 60, new SinusSignal(mainCanvas.width * 0.85 / 2, 1 / (7 * mainCanvas.height / 16 / 3), 0), -Math.PI / 2),
        new SmoothSinusoidalMotion(mainCanvas.height / 2 + 50, 60, new SinusSignal(mainCanvas.width * 0.85 / 2, 1 / (7 * mainCanvas.height / 16 / 3), Math.PI), -Math.PI / 2)
    ]);
    
    for (let i = 0; i < 8; i++) {
        const color = BOTH_ENERGYBALL_COLOR;
        new EnergyBall(mainCanvas, color, new Coordinates(mainCanvas.width / 2, -50), 40, 2, compoundMotion2, 950);
        // new EnergyBall(mainCanvas, color, new Coordinates(mainCanvas.width / 2, -50), 40, 2, compoundMotion2, 800); bug à corriger
    }
})();


function animate() {
    // mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.fillStyle = '#481058';
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    Projectile.everyInstance.forEach(projectile => projectile.draw());
    mario.draw();
    luigi.draw();
    EnergyBall.everyInstance.forEach(energyBall => energyBall.draw());

    Projectile.everyInstance.forEach(projectile => projectile.update());
    EnergyBall.everyInstance.forEach(energyBall => energyBall.update());
    mario.update();
    luigi.update();


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

window.GamesBall = GamesBall;
window.InstancesManager = InstancesManager;
window.mainCanvas = mainCanvas;
window.mainCtx = mainCtx;
window.EnergyBall = EnergyBall;
window.CompoundMotion = CompoundMotion;
window.LinearMotion = LinearMotion;

// EnergyBall.everyInstance[2].compoundMotion = new CompoundMotion([
//     new LinearMotion(mainCanvas.height, 900, -Math.PI / 2)
// ]);

// EnergyBall.everyInstance[2].delay = 0;