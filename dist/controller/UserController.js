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
const User_1 = require("../firestore/collections/User");
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json(yield User_1.User.all());
        });
    }
    byID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findOne(req.params.id);
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'user not found'
                });
            }
            return res.json(user);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password, userFirstName, userLastName, userEmail, userPhone } = req.body;
            // console.log(username, password, userFirstName, userLastName, userEmail, userPhone)
            res.json({ username, password, userFirstName, userLastName, userEmail, userPhone });
        });
    }
}
exports.UserController = UserController;
