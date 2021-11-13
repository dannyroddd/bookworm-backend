//dependencies 
require("dotenv").config()


// port variable
const {PORT = 3000, MONGODB_URL} = process.env

const express = require("express")

const app = express()
const mongoose = require("mongoose")



//import middleware

const cors = require("cors") //cors headers, gives frontend permission to use this backend
const morgan = require("morgan") //logging , better for diagnosing errors and fixing them 




//database connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected to Mongo"))
.on("error", (error) => console.log(error))

//models
const BookSchema = new mongoose.Schema(
    {
       title: String,
       url: String
    }
)

const Book = mongoose.model("Book", BookSchema)

//register middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//routes
app.get("/", (req, res) =>{
    res.send("Hello world")
})

// Index route
app.get("/bookmarks", async(req, res) => {
    try{
        res.json(await Book.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})


//server listener
app.listen(PORT, () => {console.log(`Listening on ${PORT}`)})