let sequelize = require('../app').sequelize,
    Sequelize = require('sequelize');

const Collage = sequelize.define('collage', {
    name: { type: Sequelize.STRING, allowNull: false }
});