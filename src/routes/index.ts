import { Application } from "express";

import UserRoute from "./User";
import PlaceRoute from "./Places";
import PaymentRoute from "./Payment";
import PackageRoute from "./Packages";


export class IndexRoute {
    public routes(app: Application): void {
        PlaceRoute.routes(app)
        UserRoute.routes(app)
        PackageRoute.routes(app)
        PaymentRoute.routes(app)
    }
}
