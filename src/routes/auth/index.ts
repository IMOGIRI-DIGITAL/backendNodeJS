import { Application } from "express";

import Auth from "./Auth";

export class AuthRoute {
    public async routes(app: Application) {
        Auth.routes(app)
    }
}