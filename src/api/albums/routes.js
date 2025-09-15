const AlbumsHandler = require('./handler');
const { AlbumsValidator } = require('./validator');

const routes = (service) => {
    const handler = new AlbumsHandler(service);

    return [
        {
            method: 'POST',
            path: '/albums',
            handler: handler.postAlbum,
            options: {
                validate: {
                    payload: validateAlbumPayload,
                    failAction: (request, h, err) => {
                        throw err;
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/albums/{id}',
            handler: handler.getAlbumById,
        },
        {
            method: 'PUT',
            path: '/albums/{id}',
            handler: handler.putAlbumById,
            options: {
                validate: {
                    payload: validateAlbumPayload,
                    failAction: (request, h, err) => {
                        throw err;
                    },
                },
            },
        },
        {
            method: 'DELETE',
            path: '/albums/{id}',
            handler: handler.deleteAlbumById,
        },
    ];
};

module.exports = routes;
