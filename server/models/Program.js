const { Schema } = require('mongoose');

const programSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    body: {
        type: String,
        required: true,
    }
});

module.exports = programSchema;