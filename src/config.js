const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewings = require('./app/record-viewings');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');
const createHomePageAggregator = require('./aggregators/home-page')''

function createConfig({env}) {
    const knexClient = createKnexClient({
        connectionString: env.databaseUrl
    });

    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    });

    const messageStore = createMessageStore({
        db: postgresClient
    });

    const homeApp = createHomeApp({db: knexClient});
    const recordViewingsApp = createRecordViewings({messageStore})

    const homePageAggregator = createHomePageAggregator({
        db: knexClient,
        messageStore
    });
    const aggregators = [homePageAggregator];
    const components = [];
    return {
        env,
        db: knexClient, 
        homeApp,
        recordViewingsApp,
        messageStore,
        homePageAggregator,
        aggregators,
        components
    }
}

module.exports = createConfig;