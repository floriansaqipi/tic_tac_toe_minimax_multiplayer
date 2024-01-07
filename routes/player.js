const express = require("express");

const router = express.Router();

router.get("/test", (req, res, next) => {
    res.send("<h1>sample</h1>")
})

router.get("/", (req, res, next) => {
    res.send("<h1>Test!</h1>")
})

module.exports = router