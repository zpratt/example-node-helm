const {findAllNamespaces} = require('./namespace-service');

module.exports = {
    name: 'root',
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/',
            handler: async (req) => {
                req.logger.info(`getting namespaces`);

                const namespaceNames = findAllNamespaces();

                return namespaceNames;

            }
        });
    }
};
