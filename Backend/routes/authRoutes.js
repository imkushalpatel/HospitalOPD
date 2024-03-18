const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authController = require('../controllers/authController');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const joiMiddleware = require('../middleware/joiMiddleware');
const lodash = require("lodash");
const Constants = require("../constants");

router.post('/register',
    joiMiddleware(
        Joi.object().keys({
            username: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            role: Joi.string()
                .valid(...lodash.values(Constants.ROLES))
                .trim()
                .default(Constants.ROLES.DOCTOR)
        }), 'body'
    ), authController.register);



router.post('/login',
    joiMiddleware(
        Joi.object().keys({
            username: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        }), 'body'
    ), authController.login);


router.get('/logout', sessionMiddleware, authController.logout);

module.exports = router;
