import { FPS } from "./Helpers/FPS.js";
import { PlayableCharacter } from "./Canvas/Drawings/PlayableCharacter.js";
import { KeyboardState } from "./Helpers/KeyboardState.js";
import { Coordinates } from "./Coordinates/Coordinates.js";
import { Projectile } from "./Canvas/Drawings/Projectile.js";
import { LinearMotion } from "./Motions/LinearMotion.js"
import { CompoundMotion } from "./Motions/CompoundMotion.js";
import { GamesBall } from "./Canvas/Drawings/GamesBall.js";
import { InstancesManager } from "./Helpers/InstancesManager.js";
import { EnergyBall } from "./Canvas/Drawings/EnergyBall.js";
import { MouseState } from "./Helpers/MouseState.js";
import { Random } from "./Helpers/Random.js";
import { EnergyBallsPatterns } from "./Canvas/DrawingsGenerators/EnergyBallsPatterns.js";
import { EnergyBallsGenerator } from "./Canvas/DrawingsGenerators/EnergyBallsGenerator.js";
import { settings } from "./settings.js";
import { GameStatus } from "./Game/GameStatus.js";
import { Mario } from "./Canvas/Drawings/Mario.js";
import { Luigi } from "./Canvas/Drawings/Luigi.js";
import { BaseElement } from "./Canvas/Drawings/BaseElement.js";
import { MovingRectangle } from "./Canvas/Drawings/MovingRectangle.js";
import { Game } from "./Game/Game.js";

Game.start();

// Debug
window.FPS = FPS;
window.KeyboardState = KeyboardState;
window.Projectile = Projectile;
window.Coordinates = Coordinates;

window.a = new Coordinates(0, 0);
window.b = new Coordinates(1, 1);

window.GamesBall = GamesBall;
window.InstancesManager = InstancesManager;
window.EnergyBall = EnergyBall;
window.CompoundMotion = CompoundMotion;
window.LinearMotion = LinearMotion;
window.MouseState = MouseState;
window.Random = Random;
window.EnergyBallsPatterns = EnergyBallsPatterns;
window.PlayableCharacter = PlayableCharacter;
window.settings = settings;
window.BaseElement = BaseElement;
window.MovingRectangle = MovingRectangle;
window.Mario = Mario;
window.GameStatus = GameStatus;

// EnergyBall.instances[2].compoundMotion = new CompoundMotion([
//     new LinearMotion(mainCanvas.height, 900, -Math.PI / 2)
// ]);

// EnergyBall.instances[2].delay = 0;