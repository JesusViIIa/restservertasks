const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/dbmern'
mongoose.connect(uri)
    .then(db=> console.log('db connected'))
    .catch(err=> console.error(err));

module.exports=  mongoose