const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: `${process.env.HOST}`
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: () => {
            return {
                server: `hello from ${server.info.uri}`
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