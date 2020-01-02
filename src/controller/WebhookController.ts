require('dotenv').config()

import { Application, Request, Response, response } from "express";

// Modal
import { Transactions } from "../firestore/collections";

// Helper
import { Midtrans } from "../helpers/index";
import stripTags from "string-strip-html";

export class WebhookController {
    public async index(req: Request, res: Response) {
        var status = await Midtrans.status(req.body.transaction_id)
        console.log(req.body, req.method, req.body.transaction_id)
        console.log(status)
        return res.json({ body: req.body})
    }

    public async midtrans(req: Request, res: Response) {
        var status = await Midtrans.status(req.body.transaction_id)
        var transactions = await Transactions.findOne(status.order_id)
        var { customerCardName, customerCardNumber } = req.body
        if (transactions)
        {
            var data = {
                transactionStatus: status.transaction_status,
                transactionDetails: status,
                totalPrice: status.gross_amount
            }
            var update  =  await Transactions.update(data, status.order_id)
            // console.log(update)
            // console.log(status)
            // console.log(customerCardNumber,customerCardName, req.body.customerCardName)

        }
        return res.json({ body: req.body})
    }
    
}