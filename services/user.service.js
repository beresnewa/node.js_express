const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const saltRounds = 10;

class JSONUsersService {

    getUsers = () => {
        User.find({}, function(err, docs){
            if(err) return console.log(err);

            console.log(`users: ${docs}`);
            return docs
        });

    }

    addUser = (user) => {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        User.create({ ...user, password: hash }, function(err, doc){
            if (err) return console.log(err);    
            console.log("Сохранен объект user", doc);
        });
    } 

    login = async (login, password) => {
        
        const user = await User.findOne({ login: login }, function(err, doc){
            if(err) return console.log(err);
            console.log(doc);
        });

        if(!user) {
            throw new Error ('Unable user');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const access = jwt.sign({ login, type: 'access' }, 'secret');
            console.log(access)
            return {
                user,
                access
            }

        }
        if(!isMatch) {
            throw new Error ('Unable to login');
        }
        return user;
        // if (bcrypt.compareSync(password, user.password)) {
        //     console.log(password, user.password)
        //     const access = jwt.sign({login, type: 'access'}, 'secret');
        //     return {
        //         user,
        //         access
        //     }
        // }
    }

    updateUser = (id, dataToUpdate) => {
        console.log(`dataToUpdate: ${dataToUpdate}`)
        User.findByIdAndUpdate(id, {name: dataToUpdate.name}, {new: true}, function(err, user){
            if(err) return console.log(err);
            console.log("Обновленный объект", user);
        });
    }

    deleteUser = (id) => {
        User.findOneAndDelete(id, function(err, doc){
            if(err) return console.log(err);
            console.log("Удален пользователь ", doc);
        });
    }
}

module.exports = new JSONUsersService();