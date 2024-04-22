export const settings = {
    canvas: {
        aspectRatio: 4 / 3,
        width: 1228,
        HTMLElement: document.getElementById('mainCanvas'),
        get height() { return settings.canvas.width / settings.canvas.aspectRatio; },
        get ctx() { return settings.canvas.HTMLElement.getContext('2d'); }
    },

    gameArea: {
        x: 0,
        y: 0,
        get width() { return settings.canvas.width; },
        get height() { return settings.canvas.height; }
    },

    energyBall: {
        mario: {
            type: 'mario',
            color: '#F80008',
            health: 1,
            scoreEarned: 1
        },
        luigi: {
            type: 'luigi',
            color: '#52D701',
            health: 1,
            scoreEarned: 1
        },
        all: {
            type: 'all',
            color: '#117ADF',
            health: 25,
            scoreEarned: 5
        },
        radius: 40,
        initialY: -50,
        globalVelocity: 300,
        aggressiveVelocity: 1600,
        deadVelocity: 2000
    },

    projectile: {
        mario: {
            type: 'mario',
            radius: 20,
            velocity: 2000,
            _shootingKeys: ['KeyA'],
            timeBetweenProjectiles: 200,
            color: "rgb(248, 40, 8)",
            get shootingKeys() { return [...settings.projectile.mario._shootingKeys]; }
        },
        luigi: {
            type: 'luigi',
            radius: 20,
            velocity: 2000,
            _shootingKeys: ['KeyD'],
            timeBetweenProjectiles: 200,
            color: "rgb(16, 216, 128)",
            get shootingKeys() { return [...settings.projectile.luigi._shootingKeys]; }
        }
    },

    character: {
        mario: {
            limit: {
                get left() { return settings.gameArea.x + 60; },
                get right() { return settings.gameArea.x + settings.gameArea.width - 60 - settings.character.luigi.width; }
            },
            color: '#f82808',
            velocity: 1200,
            get x() { return settings.gameArea.x + settings.gameArea.width * 0.42; },
            get y() { return settings.gameArea.y + settings.gameArea.height * 0.92; },
            get width() { return settings.gameArea.width * 0.08; },
            get height() { return settings.gameArea.height * 0.08; }
        },
        luigi: {
            limit: {
                get left() { return settings.character.mario.limit.left + settings.character.mario.width; },
                get right() { return settings.character.mario.limit.right + settings.character.mario.width; }
            },
            color: '#10d880',
            get velocity() { return settings.character.mario.velocity; },
            get x() { return settings.character.mario.x + settings.character.mario.width; },
            get y() { return settings.character.mario.y; },
            get width() { return settings.character.mario.width; },
            get height() { return settings.character.mario.height; }
        },
        keys: {
            _left: ['ArrowLeft', 'Numpad4', 'KeyK'],
            _right: ['ArrowRight', 'Numpad6', 'KeyL'],
            get left() { return [...settings.character.keys._left]; },
            get right() { return [...settings.character.keys._right]; }
        },
        invincibilityTimeWhenHit: 2,
        invincibilityColor: 'white'
    },

    impact: {
        duration: 0.01,
        color: 'white',
        radius: 60
    },

    maxFails: 3,

    HTMLElements: {
        gameOverOverlay: document.getElementById('game-over-overlay'),
        gameOverMessage: document.getElementById('game-over-message'),
        playAgainButton: document.getElementById('play-again-button'),
        playOverlay: document.getElementById('play-overlay'),
        playButton: document.getElementById('play-button'),
        score: document.getElementById('score-number'),
        lifesContainer: document.getElementById('lifes-images'),

        createLife() {
            const life = document.createElement('div');
            life.classList.add('life-symbol');
            
            return life;
        }
    },

    probabilities: {
        nodePattern: 2,
        inlineWaitPattern: 2,
        strongEnergyBallPattern: 19999
    },

    nodePattern: {
        numberOfBalls: 8,
        gap: 100,
        get minInitialX() { return 0.2 * settings.canvas.width; },
        get maxInitialX() { return 0.8 * settings.canvas.height; },
        motion1Linear: {
            direction: -Math.PI / 2,
            get distanceToTravel() { return settings.canvas.height / 2 - settings.energyBall.initialY; },
        },
        motion2Circle: {
            radius: 133,
            initialAngle: 0,
            isClockWise: true,
            get distanceToTravel() { return 2 * Math.PI * settings.nodePattern.motion2Circle.radius; }
        },
        motion3Linear: {
            direction: -Math.PI / 2,
            get distanceToTravel() { return settings.canvas.height / 2 - settings.energyBall.initialY; },
        }

    },

    inlineWaitPattern : {
        numberOfBalls: 8,
        gap: 140,
        motion1Linear: {
            direction: -Math.PI / 2,
            get distanceToTravel() { return settings.canvas.height / 2 - settings.energyBall.initialY; },
        },
        motion2Static: {
            duration: 1
        },
        motion3Linear: {
            direction: -Math.PI / 2,
            get distanceToTravel() { return settings.canvas.height / 2 - settings.energyBall.initialY; },
        }
    },

    strongEnergyBallPattern: {
        numberOfBalls: 1,
        minDirectionsChanges: 0,
        maxDirectionsChanges: 5,
        get initialX() { return settings.canvas.width / 2; }, 
        arrivalMotion: {
            direction: -Math.PI / 2,
            get velocity() { return settings.energyBall.globalVelocity * 2; },
            get distanceToTravel() { return settings.canvas.height / 16 - settings.energyBall.initialY; },
        },
        sinusoidalMotions: {
            direction: -Math.PI / 2,
            phaseShift: 0,
            get amplitude() { return settings.canvas.width * 0.85 / 2; },
            get frequency() { return 1 / (7 * settings.canvas.height / 16 / 3); }, 
            get velocity() { return settings.energyBall.globalVelocity / 5; },
            get distanceToTravel() { return 15 * settings.canvas.height / 16 - settings.energyBall.initialY; }
        }
    }
};

settings.canvas.HTMLElement.height = settings.canvas.height
settings.canvas.HTMLElement.width = settings.canvas.width;