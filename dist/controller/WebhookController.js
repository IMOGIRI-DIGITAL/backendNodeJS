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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// Modal
const collections_1 = require("../firestore/collections");
// Helper
const index_1 = require("../helpers/index");
class WebhookController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var status = yield index_1.Midtrans.status(req.body.transaction_id);
            console.log(req.body, req.method, req.body.transaction_id);
            console.log(status);
            return res.json({ body: req.body });
        });
    }
    midtrans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var status = yield index_1.Midtrans.status(req.body.transaction_id);
            var transactions = yield collections_1.Transactions.findOne(status.order_id);
            var { customerCardName, customerCardNumber } = req.body;
            if (transactions) {
                var data = {
                    transactionStatus: status.transaction_status,
                    transactionDetails: status,
                    totalPrice: status.gross_amount
                };
                var update = yield collections_1.Transactions.update(data, status.order_id);
                // console.log(update)
                // console.log(status)
                // console.log(customerCardNumber,customerCardName, req.body.customerCardName)
            }
            return res.json({ body: req.body });
        });
    }
}
exports.WebhookController = WebhookController;
