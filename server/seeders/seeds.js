const db = require('../config/connection');
const { Admin } = require('../models');
const adminSeeds = require('./adminSeeds.json');

db.once('open', async () => {
    await Admin.deleteMany({});
    await Admin.create(adminSeeds);

  console.log('all done!');
  process.exit(0);
});