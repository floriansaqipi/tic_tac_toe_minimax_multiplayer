const express = require("express");

const router = express.Router();

router.get("/test", (req, res, next) => {
    res.send("<h1>sample</h1>")
})

router.get("/", (req, res, next) => {
    res.send("<h1>Test!</h1>")
})

router.post('/', (req, res,next) => {
    
    const symbol = req.body.symbol;
    const whoPlaysFirst = req.body.whoPlaysFirst;

     if (symbol === 'X' && whoPlaysFirst === 'Player') {
      res.render('index', { mode: 'Player', symbol: 'X' });
    } else if (symbol === 'O' && whoPlaysFirst === 'Player') {
      res.render('index', { mode: 'Player', symbol: 'O' });
    } else if (symbol === 'X' && whoPlaysFirst === 'Computer') {
      res.render('index', { mode: 'Computer', symbol: 'X' });
    } else if (symbol === 'O' && whoPlaysFirst === 'Computer') {
      res.render('index', { mode: 'Computer', symbol: 'O' });
    } else {
        
      res.send('Invalid input');
    }
  });

module.exports = router