import express from 'express'
const router = express.Router()

import {getFavorites, createFavorite, deleteFavorite,getFavorite} from '../controllers/favorite.js';

router.route('').get(getFavorites).post(createFavorite)
router.route('/:id').delete(deleteFavorite).get(getFavorite)
export default router
