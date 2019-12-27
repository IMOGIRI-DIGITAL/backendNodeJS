require('dotenv').config()

import { Application, Request, Response, NextFunction } from "express";
import { User } from "./../../firestore/collections/index";
import jwt from 'jsonwebtoken'

export class LoginController {
    public async index(req: Request, res: Response) {
        const { username, password } = req.body
        const { id } = await User.findOne({ username, password })

        var expiredIn = 60 * 60
        const jwtRes = jwt.sign({ id },'secret_key',{ expiresIn: expiredIn })
        if(!id) {
            return res.status(401).json({
                status: false,
                message: "Invalid username or password"
            })
        }
        
        return res.json({ access_token: jwtRes, expiredIn, token_type: "Bearer"})
    }

    public async user(req: Request, res: Response) {
        const { body, params} = req
        const headers: any = req.headers
        let token = headers.authorization.split(" ")[1]
        try {   
            var jwtRes: any = await jwt.verify(token,'secret_key')
            var user = await User.findOne(jwtRes.id)
            return  res.json(user)
        } catch (error) {
            console.log("error => ",JSON.stringify(error))
            return res.status(401).json(JSON.stringify(error))
        }
    }

    public async users(req: Request, res: Response)  {
        res.send('p')
    }

}