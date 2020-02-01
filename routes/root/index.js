const {findAllNamespaces} = require('./namespace-service');
const {findAllPodsByNamespace} = require('./pod-service');

module.exports = {
    name: 'root',
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/',
            handler: async (req) => {
                req.logger.info(`getting namespaces`);

                return findAllNamespaces();

            }
        });

        server.route({
            method: 'GET',
            path: '/pods/{namespace}',
            handler: async (req) => {
                const {namespace} = req.params;
                req.logger.info(`getting pods for ${namespace}`);

                return findAllPodsByNamespace(namespace);
            }
        });
    }
};
