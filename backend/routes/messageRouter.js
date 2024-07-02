import express from 'express';
import { sendMessage, getMessage,sendGroupMessage, likeMessage } from '../controllers/messageControllers.js';
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router();

router.get('/:id',protectRoute,getMessage);
router.post('/send/:id',protectRoute,sendMessage);
router.post('/:groupId',protectRoute, sendGroupMessage);
router.post('/:messageId/like',protectRoute,likeMessage);


export default router;
