const express = require('express');
const router = express.Router()

const {getFavorites, createFavorite, deleteFavorite,getFavorite} = require('../controllers/favorite');

router.route('').get(getFavorites).post(createFavorite)
router.route('/:id').delete(deleteFavorite).get(getFavorite)
module.exports = router