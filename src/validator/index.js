const QuerySchema = require('./schema');

const validator = {
    validateQuery: (query) => {
        const validationResult = QuerySchema.validate(query);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }

        return validationResult;
    },
};

module.exports = validator;