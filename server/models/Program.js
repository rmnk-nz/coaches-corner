const { Schema, model } = require('mongoose');

const programSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
    },
);

const Program = model('Program', programSchema);

module.exports = Program;