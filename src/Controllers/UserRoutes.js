
const { check, validationResult } = require('express-validator/check');
const logger = require('../util/logger');

module.exports = function(app, passport) {

    app.get(['/', '/login'], (req, res, next) => {
        if(req.user) {
            res.redirect('/dashboard');
        }   
       else {
                res.render('accounts/login.pug', {
                title: 'Login'
            }); 
        }
    })
    /**
     * POST /login
     * Login page 
     */
    app.post('/login',[
        check('username').isEmail().withMessage('Username must be email'),
        check('password').isLength({ min : 5 }).withMessage('Password must be greater then 5 digits'),
    ], (req, res, next) => { 
            const errors = validationResult(req);
            logger.log('info', errors.array());
            if(!errors.isEmpty()) {
                req.flash("errors", errors);
                res.redirect('/login');
            }
            else {
                passport.authenticate('local-login', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/login',
                    failureFlash: true
                })(req, res, next);
            }
     });

    /**
     * GET /signup
     * Signup page 
     */
    app.get('/signup', (req, res, next) => {
        if(req.user) {
            res.redirect('/dashboard');
        } else {
            res.render('accounts/signup.pug', {
                title: 'Signup'
            });
        }
    });
    
    /**
     *  GET /logout 
     *  Log out 
     */
    app.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/login');
    });
    
    /**
     * POST /signup
     */
    app.post('/signup', [
        check('username').isEmail().withMessage('Username must be email'),
        check('password').isLength({ min: 5 }).withMessage('Password must be greater then 5 digits'),
    ], (req, res, next) => {
        const errors = validationResult(req);
        if( !errors.isEmpty() ) {
            req.flash("errors", errors);
            res.redirect('/signup');
        }
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        })(req, res, next);
    });
    
    /**
     * GET /dashboard 
     * Dashboard page  
     */
    app.get('/dashboard', (req, res) => {
        if(req.user)
            res.render('dashboard/dashboard.pug');
        else 
            res.redirect('/login');
    });
    
};