const express = require("express")
const app = express()
const dotenv = require("dotenv")
const multer = require("multer")
const path = require("path")
const cors = require("cors")

const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/categories")
dotenv.config()

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "./images")))
app.use(cors())

mongoose
.connect(process.env.MONGDODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})
.then(console.log("Connected to MongoDb"))
.catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, callb) => {
      callb(null, "images")
    },
    filename: (req, file, callb) => {
      callb(null, "file.jpg")
    }
  })

const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)
app.use("/category", authCat)



app.listen("4444", () => {
    console.log("Backend running...")
})