require('dotenv').config();
const Hapi = require('@hapi/hapi');
const songsRoutes = require('./api/songs/routes');
const albumsRoutes = require('./api/albums/routes');
const AlbumsService = require('./service/postgres/albumsService');
const SongsService = require("./service/postgres/songsService");


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

    const albumsService = new AlbumsService();
    const songsService = new SongsService();

    server.route(albumsRoutes(albumsService));
    server.route(songsRoutes(songsService));


    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
