"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Places_1 = __importDefault(require("./Places"));
const Payment_1 = __importDefault(require("./Payment"));
const Packages_1 = __importDefault(require("./Packages"));
class IndexRoute {
    routes(app) {
        Places_1.default.routes(app);
        User_1.default.routes(app);
        Packages_1.default.routes(app);
        Payment_1.default.routes(app);
    }
}
exports.IndexRoute = IndexRoute;
