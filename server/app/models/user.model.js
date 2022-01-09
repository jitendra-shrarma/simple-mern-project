var mongoose = require('mongoose');

// mongoose schema to define a model
var UserSchema = new mongoose.Schema({
    id : Number,
    name : String,
    email : String,
    address : String,
    joining_date : Date
});

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User', UserSchema);