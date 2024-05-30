const {model, Schema} = require('../connection');
const mySchema = new Schema({
      firstname :String,
      lastname :String,
      email :String,
      contactnumber :Number,
      usertype :String,
      password :String
});

module.exports = model('User', mySchema);