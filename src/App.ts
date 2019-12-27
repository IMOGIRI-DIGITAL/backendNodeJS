require('dotenv').config()

import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// routes
import { IndexRoute } from "./routes";
import { AuthRoute } from './routes/auth/index';

class App {
    public app: Application;
    private corsOPtions: object = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }
    private IndexRoute: IndexRoute = new IndexRoute();
    private AuthRoute: AuthRoute = new AuthRoute();
  
    constructor() {
      this.app = express();
      this.config();
      this.Routes();
      this.ErrorHandler();
    }
  
    private config(): void {
      // support application/json
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(helmet())
      this.app.use(morgan('dev'))
      this.app.use(cors(this.corsOPtions))
    }

    private Routes(): void {
      this.IndexRoute.routes(this.app)
      this.AuthRoute.routes(this.app);
    }

    private ErrorHandler(): void {
      this.app.use((req: Request, res: Response, next: NextFunction): void => {
        const err: any = new Error ("Whoooopsss...!")
        err.status = 404

        next(err)
      })

      if ( process.env.NODE_ENV === 'dev' )
      {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction): object => {
          return res.status(err.status || 500).json({
            status: false,
            message: err.message,
            errors: err
          })
        })
      }
      else
      {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction): object => {
          return res.status(err.status || 500).json({
            status: false,
            message: err.message
          })
        })
      }
    }
  }
  
  export default new App().app;