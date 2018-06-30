// import logger from './logger';
// import dotenv from 'dotenv';

let logger = require('./logger'),
    dotenv = require('dotenv');

if(process.env.NODE_ENV === 'production') {
    //Environment variable for production purpose 
    dotenv.config({ path: '.env.prod'});
} else if(process.env.NODE_ENV === 'testing') {
    dotenv.config({ path: '.env.test'});
} else {
    // default environment setup (development environment)
    dotenv.config({ path : '.env.dev' });
}

const SESSION_SECRET = process.env['SESSION_SECRET'];
const DIALECT = 'postgres';
const HOST = process.env['HOST'];
const PORT = process.env['PORT'];
const USERNAME = process.env['USERNAME'];
const PASSWORD = process.env['PASSWORD'];
const DB_NAME = process.env['DB_NAME'];
const NODE_ENV = process.env['NODE_ENV'];

module.exports = {
    SESSION_SECRET, DIALECT, HOST, PORT, USERNAME, PASSWORD, DB_NAME, NODE_ENV
}