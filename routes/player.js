const path = require('path');
const express = require("express");
const router = express.Router();

const rootDir = require('../util/path');

router.get("/", (req, res, next) => {
  res.render('index');
});

router.post('/board', (req, res,next) => {
    
  const symbol = req.body.symbol;
  const whoPlaysFirst = req.body.whoPlaysFirst;
  const playerName = req.body.playerName;

  let isPcFirst=whoPlaysFirst==='Computer';
  let symbol1='';
  if(symbol==="X"){

    symbol1='O';
  }else{
    symbol1='X';
  }
    res.render('board', {
      symbolOfPlayer:symbol,
      symbolOfPlayer1:symbol1,
      whoPlaysFirst:whoPlaysFirst,
      isPcTurn:isPcFirst,
      playerName:playerName
     });
});

module.exports = router