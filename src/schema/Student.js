let Sequelize = require('sequelize'),
    sequelize = require('../app').sequelize;

const Student = sequelize.define('student', {
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    date_of_join : { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            notNull: true
        }
    },
    roll_num: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female', 'other']
    }
});

module.exports = Student;