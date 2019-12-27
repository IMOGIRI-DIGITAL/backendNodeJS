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
const collections_1 = require("./../../firestore/collections");
class RegisterController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password, c_password, userEmail, userFirstName, userLastName } = req.body;
            const saveData = yield collections_1.User.save({ username, password, userEmail, userFirstName, userLastName });
            if (!saveData) {
                return res.status(422).json({
                    status: false,
                    message: "Failed save data"
                });
            }
            return res.json(saveData);
        });
    }
}
exports.RegisterController = RegisterController;
