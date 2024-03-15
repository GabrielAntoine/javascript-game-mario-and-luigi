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
import { settings } from "./settings.js";
import { InteractionPlayableCharacterEnergyBalls } from "./CanvasObjects/InteractionsBetweenElements/InteractionPlayableCharacterEnergyBalls.js";

const mainCanvas = settings.canvas.HTMLElement;
const mainCtx = settings.canvas.ctx;

mainCanvas.height = settings.canvas.height
mainCanvas.width = settings.canvas.width;

window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        FPS.stop();
    } else {
        FPS.start();
    }
});

const mario = new PlayableCharacter(
    settings.canvas.HTMLElement,
    settings.character.mario.color,
    new Coordinates(settings.character.mario.x, settings.character.mario.y),
    {left: settings.character.mario.limit.left, right: settings.character.mario.limit.right},
    settings.character.mario.width,
    settings.character.mario.height,
    settings.character.mario.velocity,
    settings.character.keys.left,
    settings.character.keys.right,
    {
        type: settings.projectile.mario.type,
        radius: settings.projectile.mario.radius,
        velocity: settings.projectile.mario.velocity,
        shootingKeys: settings.projectile.mario.shootingKeys,
        timeBetweenProjectiles: settings.projectile.mario.timeBetweenProjectiles,
        color: settings.projectile.mario.color
    }
);

const luigi = new PlayableCharacter(
    settings.canvas.HTMLElement,
    settings.character.luigi.color,
    new Coordinates(settings.character.luigi.x, settings.character.luigi.y),
    {left: settings.character.luigi.limit.left, right: settings.character.luigi.limit.right},
    settings.character.luigi.width,
    settings.character.luigi.height,
    settings.character.luigi.velocity,
    settings.character.keys.left,
    settings.character.keys.right,
    {
        type: settings.projectile.luigi.type,
        radius: settings.projectile.luigi.radius,
        velocity: settings.projectile.luigi.velocity,
        shootingKeys: settings.projectile.luigi.shootingKeys,
        timeBetweenProjectiles: settings.projectile.luigi.timeBetweenProjectiles,
        color: settings.projectile.luigi.color
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
window.settings = settings;

// EnergyBall.everyInstance[2].compoundMotion = new CompoundMotion([
//     new LinearMotion(mainCanvas.height, 900, -Math.PI / 2)
// ]);

// EnergyBall.everyInstance[2].delay = 0;