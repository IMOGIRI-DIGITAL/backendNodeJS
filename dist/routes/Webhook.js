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
const controller_1 = require("../controller");
class Webhook {
    constructor() {
        this.api = '/api/v1';
        this.prefix = `${this.api}/webhook`;
        // controller
        this.WebhookController = new controller_1.WebhookController();
    }
    routes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get(`${this.prefix}`, this.WebhookController.index);
            app.post(`${this.prefix}`, this.WebhookController.index);
            app.post(`${this.prefix}/midtrans`, this.WebhookController.midtrans);
        });
    }
}
exports.default = new Webhook();
