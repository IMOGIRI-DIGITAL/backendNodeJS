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
const index_1 = require("./../../firestore/collections/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const { id } = yield index_1.User.findOne({ username, password });
            var expiredIn = 60 * 60;
            const jwtRes = jsonwebtoken_1.default.sign({ id }, 'secret_key', { expiresIn: expiredIn });
            if (!id) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid username or password"
                });
            }
            return res.json({ access_token: jwtRes, expiredIn, token_type: "Bearer" });
        });
    }
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const headers = req.headers;
            let token = headers.authorization.split(" ")[1];
            try {
                var jwtRes = yield jsonwebtoken_1.default.verify(token, 'secret_key');
                var user = yield index_1.User.findOne(jwtRes.id);
                return res.json(user);
            }
            catch (error) {
                console.log("error => ", JSON.stringify(error));
                return res.status(401).json(JSON.stringify(error));
            }
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('p');
        });
    }
}
exports.LoginController = LoginController;
