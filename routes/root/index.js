const kubernetes = require('@kubernetes/client-node');

function buildClient() {
    const config = new kubernetes.KubeConfig();
    config.loadFromCluster();

    return config.makeApiClient(kubernetes.CoreV1Api);
}

module.exports = {
    name: 'root',
    register: (server) => {
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
    }
};
