const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const users = require('../users.json');

const saltRounds = 10;


class JSONUsersService {
    
    usersList = users;

    getUsers = () => {
        return this.usersList;
    }

    addUser = (user) => {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        this.usersList.push({ 
            ...user,
            password: hash
        });
        
        fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n");
            }
        });
        return this.usersList;
    }

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
        console.log(`этот юзер ${this.usersList[index]}`);
        
        this.usersList[index] = {
            ...this.usersList[index],
            ...dataToUpdate
        }
        console.log(`измененый ${this.usersList[index]}`);

        fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n");
            }
        });
        return this.usersList[index];
    }

    deleteUser = (id) => {
        const index = this.usersList.findIndex(user => user.id === id);
        this.usersList.splice(index, 1)
        return this.usersList;
    }
}

module.exports = new JSONUsersService();