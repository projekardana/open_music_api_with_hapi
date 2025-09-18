const SongsHandler = require('./handler');
const { SongsValidator } = require('./validator');
const Joi = require('joi');

const routes = (service) => {
    const handler = new SongsHandler(service, SongsValidator);

    return [
        {
            method: 'POST',
            path: '/songs',
            handler: handler.postSong,
            options: {
                validate: {
                    payload: SongsValidator.validateSongPayload,
                    failAction: (request, h, err) => {
                        throw err; // diproses sebagai ClientError di handler
                    },
                },
            },
        },
        {
            method: 'GET',
            path: '/songs',
            handler: handler.getSongs,
            options: {
                validate: {
                    query: Joi.object({
                        title: Joi.string().optional(),
                        performer: Joi.string().optional(),
                    }),
                    failAction: (request, h, err) => {
                        throw err;
                    },
                },
            },
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
                    payload: SongsValidator.validateSongPayload, // ✅ perbaikan di sini
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
