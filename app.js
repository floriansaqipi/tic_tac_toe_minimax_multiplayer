const path = require("path")
const express = require("express")

const playerRoutes = require("./routes/player")

const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(playerRoutes)

app.use((req, res, next) => {
  res.status(404).render("404")
})

const server = app.listen(3000)

const io = require("socket.io")(server)
io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("turn-played", (message, room) => {
    console.log(message)
    if (room === "") {
      socket.emit("receive-message", message) //sends to all
      // socket.broadcast.emit('receive-message', "Hello from server public")   //sends to all except the one who sent it
    } else {
      socket.to(room).emit("receive-message", "Hello from server private ") //sends exactly to the one who sent it
    }
  })
})
