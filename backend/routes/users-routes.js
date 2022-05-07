const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.post(
  '/initRecord',
  [
    check('message').optional({ checkFalsy: true }).isLength({ max: 200 }),
    check('user').not().isEmpty().isLength({ max: 64 }),
    check('nftTokenType').not().isEmpty(),
    check('nftTokenId').not().isEmpty(),
    check('attrKeyword').isLength({ max: 20 }),
  ],
  usersController.initRecord
);

router.post('/mrrQueue', usersController.mrrQueue);

router.post('/initMrr', usersController.initMrr);

router.post(
  '/suggestion',
  [
    check('nftProject').optional({ checkFalsy: true }).isLength({ max: 60 }),
    check('featureSuggestion')
      .optional({ checkFalsy: true })
      .isLength({ max: 200 }),
    check('email').optional({ checkFalsy: true }).normalizeEmail().isEmail(),
  ],
  usersController.suggestion
);

router.post(
  '/sendMail',
  [
    check('emailFrom').not().isEmpty().isLength({ max: 40 }),
    check('emailTo').not().isEmpty().isEmail().normalizeEmail(),
    check('subject').isLength({ max: 100 }),
    check('attrNFTName').not().isEmpty(),
    check('nftTokenType').not().isEmpty(),
    check('nftTokenId').not().isEmpty(),
    check('userAddress').not().isEmpty(),
    check('dna').not().isEmpty().isLength({ max: 200 }),
    check('image').not().isEmpty().isLength({ max: 200 }),
  ],
  usersController.sendMail
);

module.exports = router;
