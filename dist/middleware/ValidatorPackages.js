"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Validator {
    make(method) {
        switch (method) {
            case 'LOGIN':
                return [
                    express_validator_1.check('username').not().isEmpty().withMessage('Username is required'),
                    express_validator_1.check('password').not().isEmpty().withMessage('password is required'),
                    this.response
                ];
            case 'SAVE':
                return [
                    express_validator_1.check('username').not().isEmpty().withMessage('Username is required'),
                    express_validator_1.check('password').not().isEmpty().withMessage('password is required'),
                    express_validator_1.check('c_password').not().isEmpty().withMessage('c_password is required'),
                    express_validator_1.check('userEmail').not().isEmpty().withMessage('userEmail is required').isEmail().withMessage('Email is not valid'),
                    express_validator_1.check('userFirstName').not().isEmpty().withMessage('userFirstName is required'),
                    express_validator_1.check('userLastName').not().isEmpty().withMessage('userLastName is required'),
                    this.response
                ];
        }
    }
    response(req, res, next) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }
        return next();
    }
}
exports.Validator = Validator;
