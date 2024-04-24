export const settings = {
    canvas: {
        aspectRatio: 4 / 3,
        width: 1228,
        HTMLElement: document.getElementById('mainCanvas'),
        get height() { return settings.canvas.width / settings.canvas.aspectRatio; },
        get ctx() { return settings.canvas.HTMLElement.getContext('2d'); }
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
        globalVelocity: 300,
        aggressiveVelocity: 1600,
        deadVelocity: 2000,
        get initialY() { return 0 - settings.energyBall.radius - 10; },
        get lastY() { return settings.canvas.height + settings.energyBall.radius + 10; }
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
                left: 30,
                get right() { return settings.canvas.width - 30 - settings.character.luigi.width; }
            },
            color: '#f82808',
            velocity: 1200,
            get x() { return settings.canvas.width / 2 - settings.character.mario.width; },
            get y() { return settings.canvas.height - settings.character.mario.height; },
            width: 121.5,
            height: 180
        },
        luigi: {
            limit: {
                get left() { return settings.character.mario.limit.left + settings.character.mario.width; },
                get right() { return settings.character.mario.limit.right + settings.character.luigi.width; }
            },
            color: '#10d880',
            get velocity() { return settings.character.mario.velocity; },
            get x() { return settings.character.mario.x + settings.character.mario.width; },
            get y() { return settings.character.mario.y; },
            width: 131.25,
            height: 180
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
        nodePattern: 3,
        inlineWaitPattern: 2,
        strongEnergyBallPattern: 1,
        stairsPattern: 2,
        rainPattern: 3
    },

    nodePattern: {
        numberOfBalls: 8,
        gap: 100,
        get minInitialX() { return 0.2 * settings.canvas.width; },
        get maxInitialX() { return 0.8 * settings.canvas.width; },
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

    stairsPattern: {
        numberOfBalls: 8,
        gap: 130,
        direction: -Math.PI / 4,
        width: 400,
        get minInitialX() { return 0.4 * settings.canvas.width; },
        get maxInitialX() { return 0.6 * settings.canvas.width; },
    },

    inlineWaitPattern: {
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

    rainPattern: {
        numberOfBalls: 12,
        direction: -Math.PI / 2,
        whenToWait: 0.5,
        waintingDuration: 1,
        timeBetweenEachBall: 0.4,
        get minInitialX() { return 0.1 * settings.canvas.width; },
        get maxInitialX() { return 0.9 * settings.canvas.width; }
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
    },

    sprites: {
        mario: {
            img: 'img/sprites-mario.png',
            durationInterval: 0.05,
            width: 27,
            height: 40,
            source: [
                {x: 17, y: 63},
                {x: 59, y: 63},
                {x: 101, y: 63},
                {x: 143, y: 63},
                {x: 185, y: 63},
                {x: 227, y: 63},
                {x: 269, y: 63},
                {x: 311, y: 63},
            ]
        },

        luigi: {
            img: 'img/sprites-luigi.png',
            durationInterval: 0.045,
            width: 35,
            height: 47,
            source: [
                {x: 2, y: 54},
                {x: 37, y: 54},
                {x: 72, y: 54},
                {x: 107, y: 54},
                {x: 142, y: 54},
                {x: 177, y: 54},
                {x: 212, y: 54},
                {x: 247, y: 54},
            ]
        },

        marioHit: {
            img: 'img/sprites-mario.png',
            durationInterval: 0.08,
            width: 38,
            height: 45,
            source: [
                {x: 10, y: 3191},
                {x: 48, y: 3191},
                {x: 86, y: 3191},
                {x: 124, y: 3191},
            ]
        },

        luigiHit: {
            img: 'img/sprites-luigi.png',
            durationInterval: 0.08,
            width: 32,
            height: 52,
            source: [
                {x: 2, y: 5684},
                {x: 34, y: 5684},
                {x: 66, y: 5684},
                {x: 98, y: 5684},
            ]
        }
    }
};

settings.canvas.HTMLElement.height = settings.canvas.height
settings.canvas.HTMLElement.width = settings.canvas.width;