const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const playerRoutes = require("./routes/player")
const algorithm = require("./algorithm/minimax")


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
  socket.on("get-best-move", (gameState, room) => {
    algorithm.initalizeGameState(gameState)
    io.to(room).emit("send-move", algorithm.bestSpot())
  })
})
