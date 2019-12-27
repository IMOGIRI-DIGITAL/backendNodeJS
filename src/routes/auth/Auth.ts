import { Application } from "express";
// controller
import { LoginController, RegisterController } from "./../../controller/Auth/index";
// middleware
import { Validator, ModelValidator } from "./../../middleware/index";

class Auth {
    private api = '/api/v1'
    private prefix = `${this.api}/auth`
    private LoginController: LoginController = new LoginController()
    private RegisterController: RegisterController = new RegisterController()
    private Validator: Validator = new Validator()
    private ModelValidator: ModelValidator = new ModelValidator()

    public async routes(app: Application) {

        app.post(
            `${this.prefix}/user`,
            this.LoginController.user
        )
        app.post(
            `${this.prefix}/register`,
            [this.Validator.make('REGISTER'), this.ModelValidator.registerController],
            this.RegisterController.index
        );
        app.post(
            `${this.prefix}/login`,
            // [this.Validator.make('LOGIN')],
            this.LoginController.index
        )
    }
}

export default new Auth()