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
// controller
const UserController_1 = require("../controller/UserController");
// middleware
const index_1 = require("./../middleware/index");
class User {
    constructor() {
        this.api = '/api/v1';
        this.prefix = `${this.api}/users`;
        this.UserController = new UserController_1.UserController();
        this.Validator = new index_1.Validator();
        this.routes = (app) => __awaiter(this, void 0, void 0, function* () {
            app
                .get(`${this.prefix}`, this.UserController.index);
            app
                .get(`${this.prefix}/:id`, this.UserController.byID);
            app
                .post(`${this.prefix}`, [this.Validator.make('REGISTER')], this.UserController.save);
        });
    }
}
exports.default = new User();
