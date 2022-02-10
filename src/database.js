const mongoose = require('mongoose');

const uri = 'mongodb+srv://apirest:V67Dpo7bF8FHcQjQ@cluster0.2dpva.mongodb.net/tasks'
mongoose.connect(uri)
    .then(db => console.log('db connected'))
    .catch(err => console.error(err));

module.exports = mongoose