const express = require('express');
const playerController = require('../controllers/player');
const { body } = require('express-validator');

const router = express.Router();

router.get("/", playerController.getPlayerPage);

router.post('/board', [
  body('playerName')
    .isLength({ min: 3 })
    .withMessage('Player name must be 3 or more characters'),
], playerController.postPlayerBoard);

module.exports = router;
