const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSong = this.postSong.bind(this);
        this.getSongs = this.getSongs.bind(this);
        this.getSongById = this.getSongById.bind(this);
        this.putSongById = this.putSongById.bind(this);
        this.deleteSongById = this.deleteSongById.bind(this);
    }

    async postSong(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);

            const { title, year, genre, performer, duration, albumId = null } = request.payload;
            const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: { songId },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongs(request, h) {
        try {
            const { title, performer } = request.query;
            const songs = await this._service.getSongs({ title, performer });

            return {
                status: 'success',
                data: {
                    songs,
                },
            };
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongById(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);

            return {
                status: 'success',
                data: {
                    song,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putSongById(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);

            const { id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;

            await this._service.editSongById(id, { title, year, genre, performer, duration, albumId });

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongById(request, h) {
        try {
            const { id } = request.params;

            await this._service.deleteSongById(id);

            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = SongsHandler;
