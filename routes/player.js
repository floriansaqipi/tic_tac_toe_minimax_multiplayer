const path = require('path');
const express = require("express");
const router = express.Router();

const rootDir = require('../util/path');

router.get("/", (req, res, next) => {
  res.render('index_landing');
});

router.get("/index", (req, res, next) => {
  res.render('index');
});

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