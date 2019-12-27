require('dotenv').config()

import { Request, Response } from "express";
import { User } from "../firestore/collections/User";
import { UserGet, UserSaveData } from "../resources/interfaces/collections/UserModel";

export class UserController {
    public async index(req: Request, res: Response) {
        return res.json(await User.all())
    }

    public async byID(req: Request, res: Response) {
        let user: UserGet = await User.findOne(req.params.id)
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'user not found'
            })
        }

        return res.json(user)
    }

    public async save(req: Request, res: Response) {
        let {
            username, password, userFirstName, userLastName, userEmail, userPhone
        }: UserSaveData = req.body
        // console.log(username, password, userFirstName, userLastName, userEmail, userPhone)

        res.json({ username, password, userFirstName, userLastName, userEmail, userPhone })
    }
}