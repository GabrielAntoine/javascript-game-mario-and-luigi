import { settings } from "../settings.js";
import { GameStatus } from "./GameStatus.js";

export class Interface {
    static Game;

    static {
        settings.HTMLElements.playButton.addEventListener('click', () => {
            this.removePlayOverlay();
            this.Game.animate();
        });

        settings.HTMLElements.playAgainButton.addEventListener('click', () => {
            this.removeGameOverOverlay();
            this.Game.restart();
        });
    }

    static set Game(value) {
        this.Game = value;
    }

    static notifyGameHasEnded() {
        settings.HTMLElements.gameOverOverlay.style.display = 'flex';
    }

    static removePlayOverlay() {
        settings.HTMLElements.playOverlay.style.display = 'none';
    }

    static removeGameOverOverlay() {
        settings.HTMLElements.gameOverOverlay.style.display = 'none';
    }

    static notifyScoreChanged() {
        settings.HTMLElements.score.textContent = GameStatus.score;
    }

    static notifyLivesChanged() {
        const currentNumberOfLives = settings.HTMLElements.lifesContainer.childElementCount;
        const newNumberOfLives = settings.maxFails - GameStatus.fails;

        if (currentNumberOfLives < newNumberOfLives) {
            for (let i = currentNumberOfLives; i < newNumberOfLives; i++) {
                const life = settings.HTMLElements.createLife();
                settings.HTMLElements.lifesContainer.appendChild(life);
            }
        } else if (currentNumberOfLives > newNumberOfLives) {
            const lifesContainer = settings.HTMLElements.lifesContainer;
            for (let i = currentNumberOfLives; i > newNumberOfLives; i--) {
                lifesContainer.removeChild(lifesContainer.lastChild);
            }
        }
        // else nothing to do because lives have not changed
    }
}