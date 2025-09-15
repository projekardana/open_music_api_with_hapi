const Joi = require('joi');

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(2100).required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().optional().allow(null),
    albumId: Joi.string().optional().allow(null),
});

const SongsValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    }
};

module.exports = { SongsValidator };
