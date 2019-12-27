import { Application } from "express";

import { PlaceController } from "./../controller/PlaceController";

class Places {
    private api = '/api/v1'
    private prefix = `${this.api}/places`

    // controller
    private PlaceController: PlaceController = new PlaceController()

    public async routes(app: Application) {
        app.get(
            `${this.prefix}`,
            this.PlaceController.index
        );
        app.get(
            `${this.prefix}/:id`,
            this.PlaceController.byID
        )
        app.get(
            `${this.prefix}/search/:q`,
            this.PlaceController.search
        )
    }
}

export default new Places()