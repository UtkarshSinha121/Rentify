const {model, Schema} = require('../connection');
const mySchema = new Schema({
    image :String,
    location :String,
    price :String,
    type : String,
    furnishing : String,
    contact : String,
    ownername : String,
    userid : String,
    email : String
});

module.exports = model('house', mySchema);