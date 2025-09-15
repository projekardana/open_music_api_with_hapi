class SongsHandler {
    constructor(service) {
        this._service = service;

        this.postSong = this.postSong.bind(this);
        this.getSongs = this.getSongs.bind(this);
        this.getSongById = this.getSongById.bind(this);
        this.putSongById = this.putSongById.bind(this);
        this.deleteSongById = this.deleteSongById.bind(this);
    }

    async postSong(request, h) {
        try {
            const { title, year, genre, performer, duration, albumId } = request.payload;

            const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: { songId },
            });
            response.code(201);
            return response;
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(400);
        }
    }

    async getSongs(request, h) {
        const songs = await this._service.getSongs();

        return {
            status: 'success',
            data: { songs },
        };
    }

    async getSongById(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);

            return {
                status: 'success',
                data: { song },
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }

    async putSongById(request, h) {
        try {
            const { id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;

            await this._service.editSongById(id, { title, year, genre, performer, duration, albumId });

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
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
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }
}

module.exports = SongsHandler;