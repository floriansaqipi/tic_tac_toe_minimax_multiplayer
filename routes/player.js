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

  let isPcFirst=whoPlaysFirst==='Computer';
  let symbol1='';
  if(symbol==="X"){

    symbol1='O';
  }else{
    symbol1='X';
  }
    res.render('index', {
      symbolOfPlayer:symbol,
      symbolOfPlayer1:symbol1,
      whoPlaysFirst:whoPlaysFirst,
      isPcTurn:isPcFirst
     });
});

module.exports = router