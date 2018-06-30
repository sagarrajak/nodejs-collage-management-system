
let  passportLocal = require('passport-local');
let User = require('../schema/User');
let logger = require('../util/logger');

const LocalStrategy = passportLocal.Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(undefined, user.username );
    });
    
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { 'username': id }
        })
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err, null);
        });
    });

    /**
     * Passport configuration for sign-up 
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        process.nextTick(() => {
            User.findOne({
                where: { "username": username }
            })
            .then((user) => {
                console.log(user);
                if(user) {
                    // User already there 
                    done(null, false, req.flash('signupMessages', 'That username is already taken'));
                } else {
                    // Create new user 
                    User.create({'username': username, 'password': password })
                        .then( (user) => {
                             done(null, user, req.flash('signupMessages', 'Sign Up successfully!'));   
                        })
                        .catch(err => {
                            throw err;
                            done(err);
                        })
                }
            })
            .catch((err) => {
                throw err;
                done(err);
            })
        })
    }));


    /**
     * Passport configuration for login
     */
    passport.use('local-login', new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, (req, username, password, done) => {
        process.nextTick(() => {
            User.findOne({
                where: { 'username': username }
            })
            .then((user) => {
                console.log(user);
                if(!user) {
                    done(null, false, req.flash('loginMessage', 'No user found!'));
                }
                else if(!user.matchPassword(password)) {
                    done(null, false, req.flash('loginMessage', 'incorrect password'));
                }
                else {
                    done(null, user);
                }
            })
            .catch((err) => {
                throw err;
            })
        });
    }));
} 
