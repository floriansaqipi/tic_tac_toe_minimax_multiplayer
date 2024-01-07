const express = require("express")

const playerRoutes = require("./routes/player")

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(playerRoutes);

app.use( (req, res, next) => {
    res.status(404).send("<h1>Page not found!</h1>");
})

app.listen(3000)