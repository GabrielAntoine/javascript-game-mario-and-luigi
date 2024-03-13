export const config = {
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
            shootingKeys: ['KeyA'],
            timeBetweenProjectiles: 200,
            color: "rgb(248, 40, 8)"
        },
        luigi: {
            type: 'luigi',
            radius: 20,
            velocity: 2000,
            shootingKeys: ['KeyD'],
            timeBetweenProjectiles: 200,
            color: "rgb(16, 216, 128)"
        }
    },
    character: {
        mario: {
            // TO DO
        },
        luigi: {
            // TO DO
        },
        velocity: 1200
    }
};