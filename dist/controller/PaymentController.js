"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Firestore
const index_1 = require("../firestore/index");
// Modal
const collections_1 = require("../firestore/collections");
// Helper
const index_2 = require("../helpers/index");
const string_strip_html_1 = __importDefault(require("string-strip-html"));
const number_format = require('numeral');
class PaymentController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.body;
            console.log(req.body, req.params, req.query);
            try {
                const result = yield index_2.Midtrans.create(data);
                console.log(result);
            }
            catch (error) {
                console.log(data);
                console.log(error.rawHttpClientData.data);
                return res.status(401).json({
                    status: false,
                    message: error.rawHttpClientData.data
                });
            }
            return res.json({ 'asd': 'asd' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.body.midtrans;
            var user = req.body.user;
            var packages = req.body.packages;
            var { customerCardName, customerCardNumber, totalPrice, totalPerson } = req.body;
            const midtrans = yield index_2.Midtrans.create(data);
            var status = yield index_2.Midtrans.status(midtrans.req.transaction_details.order_id);
            var transactionId = midtrans.req.transaction_details.order_id;
            var savedData = {
                userId: index_1.db.doc(`users/${user.id}`),
                packageId: index_1.db.doc(`packages/${packages.id}`),
                customerCardName: string_strip_html_1.default(customerCardName),
                customerCardNumber: customerCardNumber,
                totalPerson,
                totalPrice,
                totalPriceFormat: number_format(totalPrice).format('0,0'),
            };
            // console.log(db.doc(`users/${user.id}`).ref)
            console.log(midtrans);
            console.log(savedData);
            const saveTransaction = yield collections_1.Transactions.save(savedData, transactionId);
            console.log(saveTransaction);
            console.log(status);
            // console.log(savedData)
            // console.log(req.body)
            // return res.json({
            //     status: false,
            //     message: 'ga ad'
            // })
            return res.json(midtrans.res);
        });
    }
    payment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { transaction_id } = req.params;
            // var status = await Midtrans.status(transaction_id)
            // console.log(status)
            return res.send('ok');
        });
    }
    status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { transaction_id } = req.params;
            var status = yield index_2.Midtrans.status(transaction_id);
            console.log(status);
            return res.send('ok');
        });
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { user_id } = req.params;
            var ref = index_1.db.collection('users').doc(user_id);
            var query = index_1.db.collection('transactions').where('userId', '==', ref);
            var data = yield query.get();
            var result = [];
            data.forEach((data) => {
                result.push(data.data());
            });
            return res.json({ status: true, data: result });
        });
    }
}
exports.PaymentController = PaymentController;
