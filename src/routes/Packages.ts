import { Application } from "express";

import { PackageController } from "./../controller/PackageController";

class Package {
    private api = '/api/v1'
    private prefix = `${this.api}/packages`

    // controller
    private PackageController: PackageController = new PackageController()

    public async routes(app: Application) {
        app.get(
            `${this.prefix}`,
            this.PackageController.index
        );
        app.get(
            `${this.prefix}/:id`,
            this.PackageController.findOne
        );
        app.post(
            `${this.prefix}`,
            this.PackageController.save
        );
    }
}

export default new Package()