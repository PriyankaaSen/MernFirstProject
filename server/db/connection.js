const mongoose = require('mongoose');
const DB = process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log(`successful`);
  }).catch((err) => console.log('err'));
