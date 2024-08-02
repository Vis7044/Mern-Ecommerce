const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config();
const connectDb = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = 8080 || process.env.PORT;

connectDb().then(() => {
    app.listen(PORT,()=> {
        console.log("connected to db")
        console.log("Server is Running on PORT "+PORT)
    })
}).catch((error)=> {
    console.log(error)
})

