class AlbumsHandler {
    constructor(service) {
        this._service = service;

        this.postAlbum = this.postAlbum.bind(this);
        this.getAlbumById = this.getAlbumById.bind(this);
        this.putAlbumById = this.putAlbumById.bind(this);
        this.deleteAlbumById = this.deleteAlbumById.bind(this);
    }

    async postAlbum(request, h) {
        try {
            const { name, year } = request.payload;
            const albumId = await this._service.addAlbum({ name, year });

            const response = h.response({
                status: 'success',
                data: {
                    albumId,
                },
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

    async getAlbumById(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id);

            return {
                status: 'success',
                data: { album },
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }

    async putAlbumById(request, h) {
        try {
            const { id } = request.params;
            const { name, year } = request.payload;

            await this._service.editAlbumById(id, { name, year });

            return {
                status: 'success',
                message: 'Album berhasil diperbarui',
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }

    async deleteAlbumById(request, h) {
        try {
            const { id } = request.params;

            await this._service.deleteAlbumById(id);

            return {
                status: 'success',
                message: 'Album berhasil dihapus',
            };
        } catch (error) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(404);
        }
    }
}

module.exports = AlbumsHandler;
