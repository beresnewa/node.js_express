const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const saltRounds = 10;

class JSONUsersService {

    getUsers = async(reqUser, query) => {
        // const { page = 1, limit = 1 } = query
        const filter = query.filter
        const page = query.page
        const limit = query.limit
        const sort = query.sort ? query.sort : ''
        
        let allUsers = []
        let count = 0

        if(filter) {
            allUsers = await User.find({ name: filter })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sort)
            .exec();
            count = await User.countDocuments({ name: filter });
        } else {
            allUsers = await User.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sort)
            .exec();
            count = await User.countDocuments();
        }
        //     users = await User.find({})
        //     .where('breed').in(arrSort)
        //     .exec();
        let users = allUsers.filter(user => { 
            return user._id.toString() !== reqUser._id.toString()
        })
        
        return {
            users,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }
    }

    addUser = async(userReq) => {
        const login = userReq.login
        const findedUser = await User.findOne({ login: login });
        if(findedUser) {
            throw new Error ('User already exists');
        }
        const hash = bcrypt.hashSync(userReq.password, saltRounds);
        const user = await User.create({ ...userReq, password: hash });
        user.avatars.push("http://localhost:3000/uploads/cat.png");
        await user.save();
        const token = jwt.sign({ login: login, type: 'access' }, 'secret');
        return {
            user,
            token
        }  
    }
    
    addFollowers = async(user, subscriptionId) => {
        const subscription = await User.findById(subscriptionId);
        user.subscriptions.push(subscription._id);
        subscription.followers.push(user._id);
        await user.save();
        await subscription.save();
        return {
            user,
            subscription
        }  
    }
    deleteSubscrption = async(user, id) => {
        const subscription = await User.findById(id);
        const arrIdfollowers = subscription.followers
        const indexF = arrIdfollowers.indexOf(user._id)
        subscription.followers.splice(indexF, 1)

        const arrIdSubscriptions = user.subscriptions
        const indexS = arrIdSubscriptions.indexOf(id)
        user.subscriptions.splice(indexS, 1)

        await user.save();
        await subscription.save();

        const subscriptions = await Promise.all(arrIdSubscriptions.map(async (subscriptionId) => {
            return await User.findById(subscriptionId);
        }));

        return {
            user,
            subscriptions,
            subscription
        }  
    }
    getFollowers = async(user) => {
        const arrIdfollowers = user.followers
        const arrIdSubscriptions = user.subscriptions
        const subscriptions = await Promise.all(arrIdSubscriptions.map(async (subscriptionId) => {
            return await User.findById(subscriptionId);
        }));
        const followers = await Promise.all(arrIdfollowers.map(async (followerId) => {
            return await User.findById(followerId);
        }));
        
        return {
            followers,
            subscriptions,
            user
        }
    }

    login = async (login, password) => {
        const user = await User.findOne({ login: login });
        console.log(user)
        if(!user) {
            throw new Error ('Unable user');
        }
        
        const isMatch = bcrypt.compareSync(password, user.password)
        if(!isMatch) {
            throw new Error ('Unable user');
        }
        const token = jwt.sign({ login, type: 'access' }, 'secret');
            return {
                user,
                token
            }
    }
    
    updateUser = async(id, dataToUpdate) => {
        const updateUser = await User.findByIdAndUpdate(id, {name: dataToUpdate.name}, {new: true}, function(err, user){
            if(err) return console.log(err);
            console.log("Обновленный объект", user);
        });
        return updateUser
    }

    deleteUser = (id) => {
        User.findOneAndDelete((id), function(err, doc){
            if(err) return console.log(err);
            console.log("Удален пользователь ", doc);
            return doc
        });
    }
    
    uploadPhoto = async (file, user) => {
        const linkToImage = 'http://localhost:3000/' + file.path
        if(!file) {
            throw new Error ('ошибка загрузки');
        } else {
            console.log(file);
            console.log("Файл загружен");

            user.images.push(linkToImage)
            await user.save();
            return {
                user
            }
        }
        
    }
    uploadAvatar = async (file, user) => {
        const linkToImage = 'http://localhost:3000/' + file.path
        if(!file) {
            throw new Error ('ошибка загрузки');
        } else {
            console.log(file);
            console.log("Файл загружен");
            if(user.avatars.length !== 0) {
                user.avatars.splice(0, 1)
                user.avatars.push(linkToImage)
            } else {
                user.avatars.push(linkToImage)
            }
            await user.save();
            return {
                user
            }
        }
    }

    deleteImage = async (indexImage, user) => {
        user.images.splice(indexImage, 1)
        await user.save()
        return {
            user
        }
    }

    getFollower = async (id) => {
        const follower = await User.findById(id)
        return {
            follower
        }
    }
}

module.exports = new JSONUsersService();