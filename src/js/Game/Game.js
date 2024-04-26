import { DrawableObjects } from "../Canvas/Containers/DrawableObjects.js";
import { UpdatableObjects } from "../Canvas/Containers/UpdatableObjects.js";
import { Luigi } from "../Canvas/Drawings/Luigi.js";
import { Mario } from "../Canvas/Drawings/Mario.js";
import { EnergyBallsGenerator } from "../Canvas/EnergyBallsPatterns/EnergyBallsGenerator.js";
import { Background } from "../Canvas/Sprites/Background.js";
import { FPS } from "../Helpers/FPS.js";
import { settings } from "../settings.js";
import { GameStatus } from "./GameStatus.js";
import { Interface } from "./Interface.js";

export class Game {
    static {
        this.animate = this.animate.bind(this);
        Interface.Game = this;
    }

    static start() {
        this.createEventListeners();
        this.createResources();

        Interface.notifyScoreChanged();
        Interface.notifyLivesChanged();
    }

    static over() {
        this.pause();

        Interface.notifyGameHasEnded();
    }

    static restart() {
        this.clearResources();
        this.createResources();

        GameStatus.reset();

        this.animate();
    }

    static pause() {
        GameStatus.cancelAnimationFrame();
    }

    static resume() {
        if (!GameStatus.isBeingAnimated) {
            this.animate();
        }
    }

    static animate() {
        Background.draw();
        DrawableObjects.draw();

        if (GameStatus.hasEnded) {
            this.over();
        } else {
            UpdatableObjects.update();
            
            GameStatus.requestAnimationFrame(this.animate);
        }
    }

    static drawBackground() {
        settings.canvas.ctx.fillStyle = '#481058';
        settings.canvas.ctx.fillRect(0, 0, settings.canvas.width, settings.canvas.height);
    }

    static createResources() {
        new Mario();
        new Luigi();
        new EnergyBallsGenerator(mainCanvas);
    }

    static clearResources() {
        DrawableObjects.clearObjects();
        UpdatableObjects.clearObjects();
    }

    static createEventListeners() {
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                FPS.stop();
            } else {
                FPS.start();
            }
        });
    }
}