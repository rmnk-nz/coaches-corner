const { Schema, model } = require('mongoose');

// const Program = require('./Program');
const bcrypt = require('bcrypt');

const adminSchema = new Schema (
    {
        email: {
        type: String,
        required: true,
        unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        savedPrograms: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Program',
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

adminSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

adminSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Admin = model('Admin', adminSchema);

module.exports = Admin;