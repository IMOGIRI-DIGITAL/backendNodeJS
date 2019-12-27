require('dotenv').config()

import { Application, Request, Response, NextFunction } from "express";
import { UserRegister } from "./../resources/interfaces/collections/UserModel";
import { User } from "./../firestore/collections/index";


export class ModelValidator {
    public async registerController(req: Request, res: Response, next: NextFunction) {
        let {
            username, password, c_password, userEmail, userFirstName, userLastName
        }: UserRegister = req.body
        

        if ( password !== c_password ) {
            return res.status(422).json({
                status: false,
                message: 'Password do not match'
            })
        }

        const checkEmail = await User.findOne({ userEmail })
        
        if ( checkEmail ) {
            return res.status(422).json({
                status: false,
                message: 'Email already exists'
            })
        }

        return next()

    
    }

}