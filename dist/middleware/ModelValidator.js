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
const index_1 = require("./../firestore/collections/index");
class ModelValidator {
    registerController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password, c_password, userEmail, userFirstName, userLastName } = req.body;
            if (password !== c_password) {
                return res.status(422).json({
                    status: false,
                    message: 'Password do not match'
                });
            }
            const checkEmail = yield index_1.User.findOne({ userEmail });
            if (checkEmail) {
                return res.status(422).json({
                    status: false,
                    message: 'Email already exists'
                });
            }
            return next();
        });
    }
}
exports.ModelValidator = ModelValidator;
