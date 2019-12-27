import { Application, Request, Response, NextFunction, response } from 'express'
import { validationResult, check } from "express-validator";


type METHOD = 'LOGIN' | 'SAVE'

export class Validator {
    public make(method: METHOD): any {
        switch (method) {
            case 'LOGIN':
                return [
                    check('username').not().isEmpty().withMessage('Username is required'),
                    check('password').not().isEmpty().withMessage('password is required'),
                    this.response
                ]
            case 'SAVE':
                return [
                    check('username').not().isEmpty().withMessage('Username is required'),
                    check('password').not().isEmpty().withMessage('password is required'),
                    check('c_password').not().isEmpty().withMessage('c_password is required'),
                    check('userEmail').not().isEmpty().withMessage('userEmail is required').isEmail().withMessage('Email is not valid'),
                    check('userFirstName').not().isEmpty().withMessage('userFirstName is required'),
                    check('userLastName').not().isEmpty().withMessage('userLastName is required'),
                    this.response
                ]
        }
    }

    public response(req: Request, res: Response, next: NextFunction): object | void {
        const errors = validationResult(req)

        if ( !errors.isEmpty() )
        {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            })
        }

        return next()
    }
}