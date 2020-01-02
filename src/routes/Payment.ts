import { Application } from "express";

import { PaymentController } from "./../controller";


class Payment {
    private api = '/api/v1'
    private prefix = `${this.api}/payment`

    // controller
    private PaymentController: PaymentController = new PaymentController()

    public async routes(app: Application) {
        app.get(
            `${this.prefix}`,
            this.PaymentController.index
        );
        
        app.post(
            `${this.prefix}/payment`,
            this.PaymentController.payment
        );

        app.post(
            `${this.prefix}`,
            this.PaymentController.create
        );
        
        app.get(
            `${this.prefix}/status/:transaction_id`,
            this.PaymentController.status
        );

        app.get(
            `${this.prefix}/history/:user_id`,
            this.PaymentController.getHistory
        )
    }
}

export default new Payment()