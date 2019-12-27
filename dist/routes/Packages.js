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
const PackageController_1 = require("./../controller/PackageController");
class Package {
    constructor() {
        this.api = '/api/v1';
        this.prefix = `${this.api}/packages`;
        // controller
        this.PackageController = new PackageController_1.PackageController();
    }
    routes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get(`${this.prefix}`, this.PackageController.index);
            app.get(`${this.prefix}/:id`, this.PackageController.findOne);
            app.post(`${this.prefix}`, this.PackageController.save);
        });
    }
}
exports.default = new Package();
