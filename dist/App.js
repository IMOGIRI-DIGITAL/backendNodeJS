"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// routes
const routes_1 = require("./routes");
const index_1 = require("./routes/auth/index");
class App {
    constructor() {
        this.corsOPtions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
        };
        this.IndexRoute = new routes_1.IndexRoute();
        this.AuthRoute = new index_1.AuthRoute();
        this.app = express_1.default();
        this.config();
        this.Routes();
        this.ErrorHandler();
    }
    config() {
        // support application/json
        this.app.use(body_parser_1.default.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default(this.corsOPtions));
    }
    Routes() {
        this.IndexRoute.routes(this.app);
        this.AuthRoute.routes(this.app);
    }
    ErrorHandler() {
        this.app.use((req, res, next) => {
            const err = new Error("Whoooopsss...!");
            err.status = 404;
            next(err);
        });
        if (process.env.NODE_ENV === 'dev') {
            this.app.use((err, req, res, next) => {
                return res.status(err.status || 500).json({
                    status: false,
                    message: err.message,
                    errors: err
                });
            });
        }
        else {
            this.app.use((err, req, res, next) => {
                return res.status(err.status || 500).json({
                    status: false,
                    message: err.message
                });
            });
        }
    }
}
exports.default = new App().app;
