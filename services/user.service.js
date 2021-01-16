class JSONUsersService {
    usersList = [
        {
            id:'2',
            name: 'Vasya',
            login: 'vasya123'
        }
    ]

    getUsers = () => {
        return this.usersList;
    }

    addUser = (user) => {
        this.usersList.push(user);
        return this.usersList;
    }

    update = (dataToUpdate, id) => {
        const index = this.usersList.findIndex(user => user.id === id);
        this.usersList[index] = {
            ...this.usersList[index],
            ...dataToUpdate
        }
        return this.usersList;
    }

    deleteUser = (id) => {
        const index = this.usersList.findIndex(user => user.id === id);
        this.usersList.splice(index, 1)
        return this.usersList;
    }
}

module.exports = new JSONUsersService();