const SongsHandler = require('./handler');
const { validateSongPayload } = require('./validator');

const routes = (service) => {
    const handler = new SongsHandler(service);

    return [
        {
            method: 'POST',
            path: '/songs',
            handler: handler.postSong,
            options: {
                validate: {
                    payload: validateSongPayload,
                    failAction: (request, h, err) => {
                        throw err;
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/songs',
            handler: handler.getSongs,
        },
        {
            method: 'GET',
            path: '/songs/{id}',
            handler: handler.getSongById,
        },
        {
            method: 'PUT',
            path: '/songs/{id}',
            handler: handler.putSongById,
            options: {
                validate: {
                    payload: validateSongPayload,
                    failAction: (request, h, err) => {
                        throw err;
                    },
                },
            },
        },
        {
            method: 'DELETE',
            path: '/songs/{id}',
            handler: handler.deleteSongById,
        },
    ];
};

module.exports = routes;
