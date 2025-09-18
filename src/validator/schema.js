const Joi = require('joi');

const QuerySchema = Joi.object({
    name: Joi.string().required(),
});

module.exports = QuerySchema;