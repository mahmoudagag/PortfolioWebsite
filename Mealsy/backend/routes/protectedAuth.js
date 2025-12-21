import express from 'express'
const router = express.Router()

import { loginWithCookie, logout} from '../controllers/auth.js';

router.get('/session',loginWithCookie)
router.get('/logout',logout)

export default router