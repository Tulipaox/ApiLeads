import cors from "cors"
import express from "express"
import router from "./router"
import { erroHandlerMiddleware } from "./middlewares/error-handler"

const app = express()

app.use(cors())
app.use(express.json())
app.use("api", router)
app.use(erroHandlerMiddleware)

app.listen(3000, ()=> console.log(`Servidor iniciado em http://localhost:3000/`))