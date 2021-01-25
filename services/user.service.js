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
        const index = this.usersList.findIndex(user => user.login === login);
        this.usersList.splice(index, 1);
        fs.writeFileSync("./users.json", JSON.stringify(this.usersList), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n");
            }
        });
        return this.usersList;
    }
}

module.exports = new JSONUsersService();