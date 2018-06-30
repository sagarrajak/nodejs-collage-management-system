let bcrypt = require('bcrypt-nodejs'),
    sequelize = require('../app').sequelize,
    Sequelize = require('sequelize');
    
const User = sequelize.define('user_dataset', {
    username: { type: Sequelize.STRING, primaryKey: true },
    password: { 
        type: Sequelize.STRING, allowNull: false,
        set(password) {
           this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
        }
    }
});  

User.prototype.matchPassword = function (hash) {
    return bcrypt.compareSync(hash, this.password);
}

module.exports = User;