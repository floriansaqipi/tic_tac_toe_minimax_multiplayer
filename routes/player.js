const path = require('path');
const express = require("express");
const { check, validationResult } = require('express-validator')


const router = express.Router();

const rootDir = require('../util/path');

router.get("/", (req, res, next) => {
  res.render('index', {
    errorMessage : '', 
    validationErrors : [],
     oldInput: { 
      playerName: '', 
      symbol: '', 
      whoPlaysFirst: ''
    }
  });
});

router.post('/board', 
  check('playerName').
  isLength({min : 3}).
  withMessage('Player name must be 3 or more characters') ,
  (req, res, next) => {
    
  const symbol = req.body.symbol;
  const whoPlaysFirst = req.body.whoPlaysFirst;
  const playerName = req.body.playerName;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.render('index', {
      errorMessage : errors.array()[0].msg,
      validationErrors : errors.array(),
      oldInput : {
        playerName: playerName, 
        symbol: symbol, 
        whoPlaysFirst: whoPlaysFirst
      }
      })
  }

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