import express from "express";
import {createGroup, addMembers, deleteGroup,searchGroup} from '../controllers/groupController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();
router.post('/',protectRoute, createGroup);
router.delete('/delete/:groupId',protectRoute,deleteGroup);
router.get('/search',protectRoute, searchGroup);
router.post('/:groupId/members',protectRoute,addMembers);


export default router;