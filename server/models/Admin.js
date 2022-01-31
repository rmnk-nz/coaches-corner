const mongoose = require('mongoose');

const programSchema = require('./Program');
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
        program: [programSchema]
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;