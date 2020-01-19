const Hapi = require('@hapi/hapi');
const kubernetes = require('@kubernetes/client-node');

function buildClient() {
    const config = new kubernetes.KubeConfig();
    config.loadFromCluster();

    return config.makeApiClient(kubernetes.CoreV1Api);
}

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: `${process.env.HOST}`
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async () => {
            let client;
            let result;

            try {
                client = buildClient();
                result = await client.listNamespace();
                const namespaceNames = result.namespace.body.items.map((item) => {
                    return item.metadata.name
                });

                return {
                    namespaceNames
                };
            }
            catch(err) {
                console.log('failed to list namespaces', err);

                return err;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: async () => {
            return {
                status: 'OK'
            };
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();