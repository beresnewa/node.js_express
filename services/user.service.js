const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// const users = require('../users.json');

const saltRounds = 10;

const Schema = mongoose.Schema;
const userScheme = new Schema(
    {name: String, login: String, password: String},
    {versionKey: false}
);
const User = mongoose.model("User", userScheme);



class JSONUsersService {

    getUsers = () => {
        User.find({}, function(err, docs){
            mongoose.disconnect();
            
            if(err) return console.log(err);

            console.log(`users: ${docs}`);
            return docs
        });
    }

    addUser = () => {
        let user = new User()
        user.save(function (err) {
            if (!err) {
                return console.log("created");
            }
            else {
                return console.log(err);
            }
        });
        // User.create(user, function(err, doc){
        //     mongoose.disconnect();
              
        //     if (err) return console.log(err);
              
        //     console.log("Сохранен объект user", doc);
        // });
    } 

    // addUser = (user) => {
    //     const hash = bcrypt.hashSync(user.password, saltRounds);
    //     this.usersList.push({ 
    //         ...user,
    //         password: hash
    //     });
        
    //     fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
    //         if (err) 
    //           console.log(err); 
    //         else { 
    //           console.log("File written successfully\n");
    //         }
    //     });
    //     return this.usersList;
    // }


    login = (login, password) => {

        let user  = this.usersList.find(user => {
            
            if (login === user.login) {
                return true   
            }
        })
        
        if (bcrypt.compareSync(password, user.password)) {
            const access = jwt.sign({login, type: 'access'}, 'secret');
            return {
                user,
                access
            }
        }
    }

    update = (dataToUpdate, login) => {

        const index = this.usersList.findIndex(user => user.login === login);
        this.usersList[index] = {
            ...this.usersList[index],
            ...dataToUpdate
        }
        //добавить чтобы логин брал из токена, а не передавать логин
        fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n");
            }
        });
        return this.usersList[index];
    }

    deleteUser = (login) => {
        User.findOneAndDelete(login, function(err, doc){
            mongoose.disconnect();
             
            if(err) return console.log(err);
             
            console.log("Удален пользователь ", doc);
        });
    }

    // deleteUser = (login) => {
    //     const index = this.usersList.findIndex(user => user.login === login);
    //     this.usersList.splice(index, 1);
    //     fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
    //         if (err) 
    //           console.log(err); 
    //         else { 
    //           console.log("File written successfully\n");
    //         }
    //     });
    //     return this.usersList;
    // }
}

module.exports = new JSONUsersService();