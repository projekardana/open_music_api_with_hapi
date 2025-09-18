require('dotenv').config();
const Hapi = require('@hapi/hapi');
const songsRoutes = require('./api/songs/routes');
const albumsRoutes = require('./api/albums/routes');
const AlbumsService = require('./service/postgres/albumsService');
const SongsService = require("./service/postgres/songsService");
const ClientError = require("./exceptions/ClientError");
const InvariantError = require("./exceptions/InvariantError");


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (response instanceof Error) {
            if (response instanceof ClientError || response instanceof InvariantError) {
                const customResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                customResponse.code(response.statusCode);
                return customResponse;
            }

            if (!response.isServer) {
                return h.continue;
            }

            // Server error
            console.error(response);
            const customResponse = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            customResponse.code(500);
            return customResponse;
        }

        return h.continue;
    });



    const albumsService = new AlbumsService();
    const songsService = new SongsService();

    server.route(albumsRoutes(albumsService));
    server.route(songsRoutes(songsService));


    await server.start();
    console.log(`Server berjalan pada localhost ${server.info.uri}`);
};

init();
