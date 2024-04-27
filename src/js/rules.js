import { settings } from "./settings.js";

document.getElementById('red-shell-score').textContent = settings.energyBall.mario.scoreEarned;
document.getElementById('green-shell-score').textContent = settings.energyBall.luigi.scoreEarned;
document.getElementById('antasma-score').textContent = settings.energyBall.all.scoreEarned;
document.getElementById('number-of-lives').textContent = settings.maxFails;