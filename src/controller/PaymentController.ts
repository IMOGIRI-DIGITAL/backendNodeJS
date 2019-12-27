require('dotenv').config()

import { Application, Request, Response, response } from "express";

import { Midtrans } from "../helpers/index";

export class PaymentController {
    public async index(req: Request, res: Response) {
        // var order_id
        return res.json({'asd':'asd'}) 
    }
}