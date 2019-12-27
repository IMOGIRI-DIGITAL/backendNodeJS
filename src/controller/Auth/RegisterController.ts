require('dotenv').config()

import { Application, Request, Response, NextFunction } from "express";
import { UserRegister } from "./../../resources/interfaces/collections/UserModel";

import { User } from "./../../firestore/collections";
 
export class RegisterController {
    public async index(req: Request, res: Response) {
        let {
            username, password, c_password, userEmail, userFirstName, userLastName
        }: UserRegister = req.body
        
        const saveData = <UserRegister> await User.save({ username, password, userEmail, userFirstName, userLastName })
        if ( !saveData ) {
            return res.status(422).json({
                status: false,
                message: "Failed save data"
            })
        }
        return res.json(saveData)

    }

}