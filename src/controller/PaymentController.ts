require('dotenv').config()

import { Application, Request, Response, response } from "express";

// Firestore
import { db } from "../firestore/index";

// Modal
import { Transactions } from "../firestore/collections";

// Helper
import { Midtrans } from "../helpers/index";
import stripTags from "string-strip-html";

const number_format = require('numeral');

export class PaymentController {
    public async index(req: Request, res: Response) {
        var data = req.body
        console.log(req.body,req.params,req.query)
        try {
            
            const result = await Midtrans.create(data)
            console.log(result)
        } catch (error) {

            console.log(data)
            console.log(error.rawHttpClientData.data)
            return res.status(401).json({
                status: false,
                message: error.rawHttpClientData.data
            })
        }
        return res.json({'asd':'asd'}) 
    }

    public async create(req: Request, res: Response) {
        var data = req.body.midtrans
        var user = req.body.user
        var packages = req.body.packages
        var { customerCardName, customerCardNumber, totalPrice, totalPerson } = req.body

        const midtrans: any = await Midtrans.create(data)
        var status = await Midtrans.status(midtrans.req.transaction_details.order_id)

        var transactionId = midtrans.req.transaction_details.order_id
        var savedData = {
            userId: db.doc(`users/${user.id}`),
            packageId: db.doc(`packages/${packages.id}`),
            customerCardName: stripTags(customerCardName),
            customerCardNumber: customerCardNumber,
            totalPerson,
            totalPrice,
            totalPriceFormat: number_format(totalPrice).format('0,0'),
            // transactionStatus: midtrans.res.transaction_status,
            // transactionDetails: midtrans.res
        }
        // console.log(db.doc(`users/${user.id}`).ref)
        console.log(midtrans)
        console.log(savedData)
        const saveTransaction = await Transactions.save(savedData, transactionId)
        console.log(saveTransaction)
        console.log(status)


        // console.log(savedData)
        // console.log(req.body)
        // return res.json({
        //     status: false,
        //     message: 'ga ad'
        // })
        return res.json(midtrans.res)
    }

    public async payment(req: Request, res: Response) {
        var { transaction_id } = req.params
        // var status = await Midtrans.status(transaction_id)
        // console.log(status)
        return res.send('ok')
    }

    public async status(req: Request, res: Response) {
        var { transaction_id } = req.params
        var status = await Midtrans.status(transaction_id)
        console.log(status)
        return res.send('ok')
    }

    public async getHistory(req: Request, res: Response) {
        var { user_id } = req.params
        var ref = db.collection('users').doc(user_id)
        var query = db.collection('transactions').where('userId','==',ref)
        var data = await query.get()
        var result: any[] = []
        data.forEach((data) => {
            result.push(data.data())
        })
        return res.json({ status: true, data: result })
    }
}