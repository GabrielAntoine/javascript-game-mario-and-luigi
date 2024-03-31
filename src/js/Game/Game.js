import { DrawableObjects } from "../Canvas/Containers/DrawableObjects.js";
import { UpdatableObjects } from "../Canvas/Containers/UpdatableObjects.js";
import { Luigi } from "../Canvas/Drawings/Luigi.js";
import { Mario } from "../Canvas/Drawings/Mario.js";
import { EnergyBallsGenerator } from "../Canvas/DrawingsGenerators/EnergyBallsGenerator.js";
import { FPS } from "../Helpers/FPS.js";
import { settings } from "../settings.js";
import { GameStatus } from "./GameStatus.js";

export class Game {
    static mario;
    static luigi;
    static energyBallsGenerator;

    static {
        this.animate = this.animate.bind(this);
    }

    static start() {
        this.createEventListeners();
        this.createResources();
        this.drawBackground();
    }

    static over() {
        this.pause();

        settings.HTMLElements.gameOverOverlay.style.display = 'flex';
        settings.HTMLElements.gameOverMessage.textContent = settings.interface.getGameOverSentence(GameStatus.score);
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
        this.drawBackground();
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

    static createEventListeners() {
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                FPS.stop();
            } else {
                FPS.start();
            }
        });

        settings.HTMLElements.playButton.addEventListener('click', () => {
            settings.HTMLElements.playOverlay.style.display = 'none';
            this.animate();
        });
    }
}