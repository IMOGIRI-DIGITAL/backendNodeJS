require('dotenv').config()

import { createServer, Server as HTTPServer } from "http";
import app from "./App";


class Server {
  private PORT = process.env.PORT
  private server: HTTPServer = createServer(app)

  constructor() {
    this.startNodeServer()
  }

  private startNodeServer(): void {
    this.server.listen(this.PORT, () => {
      console.log(`Server running on port : ${this.PORT}`)
    })
  }
}

new Server()
