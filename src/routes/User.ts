import { Application } from "express";

// controller
import { UserController } from "../controller/UserController";

// middleware
import { Validator } from "./../middleware/index";

class User {
    private api = '/api/v1'
    private prefix = `${this.api}/users`
    private UserController: UserController = new UserController()
    private Validator: Validator = new Validator()

    public routes = async (app: Application) => {
        app
            .get(
                `${this.prefix}`,
                this.UserController.index
            );
        app
            .get(
                `${this.prefix}/:id`,
                this.UserController.byID
            );
        app
            .post(
            `${this.prefix}`,
            [this.Validator.make('REGISTER')],
            this.UserController.save
        )
    }
    
}


export default new User()