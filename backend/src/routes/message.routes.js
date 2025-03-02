import express from "express";
import {getUsersForSidebar,getMessages,sendMessage} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get('/users',protectedRoute,getUsersForSidebar)
router.get('/:id',protectedRoute,getMessages)
router.post('/send/:id',protectedRoute,sendMessage)
// router.post('/logout',logout)
// router.post('/update-profile',protectedRoute,updateProfile)
// router.get('/check',protectedRoute,checkAuth)
export default router;