const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');

function createConfig({env}) {
    const db = createKnexClient({
        connectionString: env.databaseUrl
    });

    const homeApp = createHomeApp({db});

    return {
        env,
        db, 
        homeApp
    }
}

module.exports = createConfig;