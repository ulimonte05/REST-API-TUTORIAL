import express, {Request, Response} from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import userRouter from "./routes/users"
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((error: any) => {
    console.log("Error connecting to MongoDB")
    console.log(error)
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/auth", authRouter)
app.use("/users", userRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

