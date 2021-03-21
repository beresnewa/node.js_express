const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userScheme = new Schema(
    {
    name: String,
    login: String,
    password: String,
    followers: Array,
    subscriptions: Array, 
    images: Array,
    avatars: Array,
    age: Number,
    breed: String
    },
    {versionKey: false}
);
const User = mongoose.model("User", userScheme);

module.exports = User;