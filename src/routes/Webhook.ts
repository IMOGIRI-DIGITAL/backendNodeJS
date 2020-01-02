import { Application } from "express";

import { WebhookController } from "../controller";

class Webhook {
    private api = '/api/v1'
    private prefix = `${this.api}/webhook`

    // controller
    private WebhookController: WebhookController = new WebhookController()

    public async routes(app: Application) {
        app.get(
            `${this.prefix}`,
            this.WebhookController.index
        );

        app.post(
            `${this.prefix}`,
            this.WebhookController.index
        );

        app.post(
            `${this.prefix}/midtrans`,
            this.WebhookController.midtrans
        );

        
    }
}

export default new Webhook()