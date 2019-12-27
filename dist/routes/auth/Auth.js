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
const index_1 = require("./../../controller/Auth/index");
// middleware
const index_2 = require("./../../middleware/index");
class Auth {
    constructor() {
        this.api = '/api/v1';
        this.prefix = `${this.api}/auth`;
        this.LoginController = new index_1.LoginController();
        this.RegisterController = new index_1.RegisterController();
        this.Validator = new index_2.Validator();
        this.ModelValidator = new index_2.ModelValidator();
    }
    routes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.post(`${this.prefix}/user`, this.LoginController.user);
            app.post(`${this.prefix}/register`, [this.Validator.make('REGISTER'), this.ModelValidator.registerController], this.RegisterController.index);
            app.post(`${this.prefix}/login`, 
            // [this.Validator.make('LOGIN')],
            this.LoginController.index);
        });
    }
}
exports.default = new Auth();
