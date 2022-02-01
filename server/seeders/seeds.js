const db = require('../config/connection');
const { Admin, User, Program } = require('../models');

const adminSeeds = require('./adminSeeds.json');
const userSeeds = require('./userSeeds.json');
const programSeeds = require('./programSeeds.json');

db.once('open', async () => {
  try {
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Program.deleteMany({});

    await Admin.create(adminSeeds);
    await User.create(userSeeds);
  
    for (let i = 0; i < programSeeds.length; i++) {
      const program = await Program.create(programSeeds[i]);
      const user = await User.findOneAndUpdate(
        {
          $addToSet: {
            savedPrograms: program._id,
          },
        }
      );
      const admin = await Admin.findOneAndUpdate(
        {
          $addToSet: {
            savedPrograms: program._id,
          },
        }
      );
    }
  
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});