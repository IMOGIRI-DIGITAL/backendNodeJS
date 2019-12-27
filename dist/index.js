"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const http_1 = require("http");
const App_1 = __importDefault(require("./App"));
class Server {
    constructor() {
        this.PORT = process.env.PORT;
        this.server = http_1.createServer(App_1.default);
        this.startNodeServer();
    }
    startNodeServer() {
        this.server.listen(this.PORT, () => {
            console.log(`Server running on port : ${this.PORT}`);
        });
    }
}
new Server();
