export const settings = {
    canvas: {
        aspectRatio: 4 / 3,
        width: 1228,
        HTMLElement: document.getElementById('mainCanvas'),
        get height() { return settings.canvas.width / settings.canvas.aspectRatio; },
        get ctx() { return settings.canvas.HTMLElement.getContext('2d'); }
    },

    hitBox: {
        show: false,
        color: 'red',
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
        globalVelocity: 400,
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
            velocity: 1500,
            get x() { return settings.canvas.width / 2 - settings.character.mario.width; },
            get y() { return settings.canvas.height - settings.character.mario.height; },
            width: 100,
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
            get width() { return settings.character.mario.width; },
            get height() { return settings.character.mario.height; }
        },
        keys: {
            _left: ['ArrowLeft', 'Numpad4', 'KeyJ'],
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
            img: 'img/sprites-mario1.png',
            durationInterval: 0.05,
            width: 40,
            height: 54,
            source: [
                {x: 12, y: 8218},
                {x: 12, y: 8282},
                {x: 12, y: 8346},
                {x: 12, y: 8410},
                {x: 12, y: 8474},
                {x: 12, y: 8538},
                {x: 12, y: 8602},
                {x: 12, y: 8666}
            ]
        },

        luigi: {
            img: 'img/sprites-luigi1.png',
            durationInterval: 0.045,
            width: 42,
            height: 56,
            source: [
                {x: 11, y: 8216},
                {x: 11, y: 8280},
                {x: 11, y: 8344},
                {x: 11, y: 8408},
                {x: 11, y: 8472},
                {x: 11, y: 8536},
                {x: 11, y: 8600},
                {x: 11, y: 8664}
            ]
        },

        marioHit: {
            img: 'img/sprites-mario4.png',
            durationInterval: 0.04,
            width: 42,
            height: 48,
            source: [
                {x: 10, y: 2942},
                {x: 74, y: 2942},
                {x: 138, y: 2942},
                {x: 202, y: 2942},
                {x: 266, y: 2942},
                {x: 330, y: 2942},
                {x: 394, y: 2942},
                {x: 458, y: 2942},
            ]
        },

        luigiHit: {
            img: 'img/sprites-luigi3.png',
            durationInterval: 0.038,
            width: 36,
            height: 50,
            source: [
                {x: 14, y: 6250},
                {x: 78, y: 6250},
                {x: 142, y: 6250},
                {x: 206, y: 6250},
                {x: 270, y: 6250},
                {x: 334, y: 6250},
                {x: 398, y: 6250},
                {x: 462, y: 6250},
            ]
        },

        energyBall: {
            all: {
                img: 'img/sprites-antasma.png',
                durationInterval: 0.07,
                width: 61,
                height: 34,
                source: [
                    {x: 11, y: 239},
                    {x: 93, y: 239},
                    {x: 175, y: 239},
                    {x: 257, y: 239},
                    {x: 339, y: 239},
                    {x: 421, y: 239},
                    {x: 503, y: 239},
                    {x: 585, y: 239},
                    {x: 667, y: 239},
                    {x: 749, y: 239}
                ]
            },

            mario: {
                img: 'img/sprites-3dshell.png',
                durationInterval: 0.07,
                width: 31,
                height: 25,
                source: [
                    {x: 393, y: 3054},
                    {x: 441, y: 3054},
                    {x: 489, y: 3054},
                    {x: 537, y: 3054},
                    {x: 585, y: 3054},
                    {x: 633, y: 3054},
                    {x: 681, y: 3054},
                    {x: 729, y: 3054},
                ]
            },

            luigi: {
                img: 'img/sprites-3dshell.png',
                durationInterval: 0.07,
                width: 31,
                height: 25,
                source: [
                    {x: 9, y: 3054},
                    {x: 57, y: 3054},
                    {x: 105, y: 3054},
                    {x: 153, y: 3054},
                    {x: 201, y: 3054},
                    {x: 249, y: 3054},
                    {x: 297, y: 3054},
                    {x: 345, y: 3054},
                ]
            }
        },

        projectile: {
            mario: {
                img: 'img/sprites-heriss.png',
                durationInterval: 0.005,
                width: 36,
                height: 30,
                source: [
                    {x: 30, y: 1746},
                    {x: 126, y: 1746},
                    {x: 222, y: 1746},
                    {x: 318, y: 1746},
                    {x: 414, y: 1746},
                    {x: 510, y: 1746},
                    {x: 606, y: 1746},
                    {x: 702, y: 1746},
                ]
            },

            luigi: {
                img: 'img/sprites-heriss-vert.png',
                durationInterval: 0.005,
                width: 32,
                height: 29,
                source: [
                    {x: 2, y: 405},
                    {x: 36, y: 405},
                    {x: 70, y: 405},
                    {x: 104, y: 405},
                    {x: 138, y: 405},
                    {x: 172, y: 405},
                    {x: 206, y: 405},
                    {x: 240, y: 405},
                ]
            }
        },

        background: {
            img: 'img/background.png',
            width: 800,
            height: 600,
            source: {x: 2, y: 255}
        }
    }
};

settings.canvas.HTMLElement.height = settings.canvas.height
settings.canvas.HTMLElement.width = settings.canvas.width;