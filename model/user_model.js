const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    role:{type:String, require:true, default:"User",enum:["User","Super Admin", "Admin"]}
})

const users = mongoose.model("User", userSchema);

module.exports={
    users
}