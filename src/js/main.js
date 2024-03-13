import { FPS } from "./Helpers/FPS.js";
import { PlayableCharacter } from "./CanvasObjects/ElementsOnCanvas/PlayableCharacter.js";
import { KeyboardState } from "./Helpers/KeyboardState.js";
import { Coordinates } from "./Coordinates/Coordinates.js";
import { Projectile } from "./CanvasObjects/ElementsOnCanvas/Projectile.js";
import { LinearMotion } from "./MotionManagement/LinearMotion.js";
import { MovingCircle } from "./CanvasObjects/ElementsOnCanvas/MovingCircle.js";
import { CircularMotion } from "./MotionManagement/CircularMotion.js";
import { StaticMotion } from "./MotionManagement/StaticMotion.js";
import { CompoundMotion } from "./MotionManagement/CompoundMotion.js";
import { SmoothSinusoidalMotion } from "./MotionManagement/SmoothSinusoidalMotion.js";
import { SinusSignal } from "./MotionManagement/SinusSignal.js";
import { GamesBall } from "./CanvasObjects/ElementsOnCanvas/GamesBall.js";
import { InstancesManager } from "./Helpers/InstancesManager.js";
import { EnergyBall } from "./CanvasObjects/ElementsOnCanvas/EnergyBall.js";
import { InteractionProjectilesEnergyBalls } from "./CanvasObjects/InteractionsBetweenElements/InteractionProjectilesEnergyBalls.js";
import { MouseState } from "./Helpers/MouseState.js";
import { Random } from "./Helpers/Random.js";
import { EnergyBallsPatterns } from "./CanvasObjects/GameDataEvents/EnergyBallsPatterns.js";
import { EnergyBallsGenerator } from "./CanvasObjects/GameDataEvents/EnergyBallsGenerator.js";
import { config } from "./config.js";
import { InteractionPlayableCharacterEnergyBalls } from "./CanvasObjects/InteractionsBetweenElements/InteractionPlayableCharacterEnergyBalls.js";

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
        FPS.stop();
    } else {
        FPS.start();
    }
});

const mario = new PlayableCharacter(
    mainCanvas,
    "rgb(248, 40, 8)",
    new Coordinates(mainCanvas.width / 2 - mainCanvas.width * /*0.035*/ 0.080, mainCanvas.height - mainCanvas.height * 0.08),
    {left: 60, right: mainCanvas.width - 60 - mainCanvas.width * 0.08},
    mainCanvas.width * 0.08,
    mainCanvas.height * 0.08,
    config.character.velocity,
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: config.projectile.mario.type,
        radius: config.projectile.mario.radius,
        velocity: config.projectile.mario.velocity,
        shootingKeys: config.projectile.mario.shootingKeys,
        timeBetweenProjectiles: config.projectile.mario.timeBetweenProjectiles,
        color: config.projectile.mario.color
    }
)

const luigi = new PlayableCharacter(
    mainCanvas,
    "rgb(16, 216, 128)",
    new Coordinates(mario.position.x + mario.width - 1, mario.position.y),
    {left: 60 + mainCanvas.width * 0.08, right: mainCanvas.width - 60},
    mainCanvas.width * 0.08,
    mainCanvas.height * 0.08,
    config.character.velocity,
    ['ArrowLeft'],
    ['ArrowRight'],
    {
        type: config.projectile.luigi.type,
        radius: config.projectile.luigi.radius,
        velocity: config.projectile.luigi.velocity,
        shootingKeys: config.projectile.luigi.shootingKeys,
        timeBetweenProjectiles: config.projectile.luigi.timeBetweenProjectiles,
        color: config.projectile.luigi.color
    }
);

const energyBallsGenerator = new EnergyBallsGenerator(mainCanvas);

function animate() {
    // mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    Projectile.everyInstance.forEach(projectile => projectile.update());
    EnergyBall.everyInstance.forEach(energyBall => energyBall.update());
    mario.update();
    luigi.update();

    mainCtx.fillStyle = '#481058';
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    Projectile.everyInstance.forEach(projectile => projectile.draw());
    mario.draw();
    luigi.draw();
    EnergyBall.everyInstance.forEach(energyBall => energyBall.draw());

    InteractionProjectilesEnergyBalls.update();
    InteractionPlayableCharacterEnergyBalls.update();
    
    energyBallsGenerator.update();


    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Debug
window.FPS = FPS;
window.KeyboardState = KeyboardState;
window.mario = mario;
window.luigi = luigi;
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
window.InteractionProjectilesEnergyBalls = InteractionProjectilesEnergyBalls;
window.MouseState = MouseState;
window.Random = Random;
window.EnergyBallsPatterns = EnergyBallsPatterns;
window.PlayableCharacter = PlayableCharacter;
window.InteractionPlayableCharacterEnergyBalls = InteractionPlayableCharacterEnergyBalls;

// EnergyBall.everyInstance[2].compoundMotion = new CompoundMotion([
//     new LinearMotion(mainCanvas.height, 900, -Math.PI / 2)
// ]);

// EnergyBall.everyInstance[2].delay = 0;