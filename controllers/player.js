const { validationResult } = require('express-validator');

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

exports.postPlayerBoard = (req, res, next) => {
  const humanSymbol = req.body.symbol;
  const whoPlaysFirst = req.body.whoPlaysFirst;
  const playerName = req.body.playerName;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('index', {
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        playerName: playerName,
        symbol: humanSymbol,
        whoPlaysFirst: whoPlaysFirst
      }
    });
  }

  let isPcFirst = whoPlaysFirst === 'Computer';
  let aiSymbol = humanSymbol === "X" ? 'O' : 'X';

  res.render('board', {
    humanPlayer: humanSymbol,
    aiPlayer: aiSymbol,
    whoPlaysFirst: whoPlaysFirst,
    isPcTurn: isPcFirst,
    playerName: playerName
  });
}
