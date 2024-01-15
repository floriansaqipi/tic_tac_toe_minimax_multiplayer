const { check, validationResult } = require('express-validator');

exports.getPlayerPage = (req, res, next) => {
  res.render('index', {
    errorMessage: '',
    validationErrors: [],
    oldInput: {
      playerName: '',
      symbol: '',
      whoPlaysFirst: ''
    }
  });
};

exports.postPlayerBoard = [
  check('playerName')
    .isLength({ min: 3 })
    .withMessage('Player name must be 3 or more characters'),
  (req, res, next) => {
    const symbol = req.body.symbol;
    const whoPlaysFirst = req.body.whoPlaysFirst;
    const playerName = req.body.playerName;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('index', {
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
        oldInput: {
          playerName: playerName,
          symbol: symbol,
          whoPlaysFirst: whoPlaysFirst
        }
      });
    }

    let isPcFirst = whoPlaysFirst === 'Computer';
    let symbol1 = symbol === "X" ? 'O' : 'X';

    res.render('board', {
      symbolOfPlayer: symbol,
      symbolOfPlayer1: symbol1,
      whoPlaysFirst: whoPlaysFirst,
      isPcTurn: isPcFirst,
      playerName: playerName
    });
  }
];
