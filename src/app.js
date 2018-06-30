let express = require('express'),
    morgan = require('morgan'),
    session = require('express-session'),
    flash = require('express-flash'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    compression = require('compression'),
    expressValidator = require('express-validator'),
    lusca = require('lusca'),
    Sequelize = require('sequelize'),
    path = require('path'),
    redis = require('redis'),
    RedisStore = require('connect-redis')(session),
    env = require("./util/envloader"),
    logger = require('./util/logger');

let app = express();
dotenv.config({ path: ".env.dev" });
const redisClient = redis.createClient();
/**
 * Database connection 
 */
const sequelize = new Sequelize(env.DB_NAME, env.USERNAME, env.PASSWORD, {
    dialect: env.DIALECT,
    host: env.HOST,
    port: env.PORT
 });

 sequelize
    .authenticate()
    .then(() => {
        logger.log('info', 'connected to database %s', env.DIALECT, { "database": env.DB_NAME });
    })
    .catch( err => {
        logger.log('error', 'error in connecting to database', err);
        throw err;
    });

/**
 * bad practice  
 */

sequelize.sync({ });

/**
 * Express configuration 
 */
app.set("port", 3000);
app.set("views", path.join(__dirname,"../views"));
app.set("view engine","pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(morgan('dev'));
/**
 * Express session 
 */
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: env.SESSION_SECRET,
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client: redisClient,
        ttl : 30*24*60*60 // one month 
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xssProtection(true));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
module.exports = {
    app, sequelize
}
require('./passport/passport')(passport);
require('./Controllers/UserRoutes')(app, passport);

/**
 * Primary app routes 
 */
const mainRoutes = require('./Controllers/Controller')(app, express);

app.use((req, res, next) => {
    if(req.user)
        next();
    else 
        res.redirect('/login');
});
app.use('/dashboard', mainRoutes);


