import express from "express";
import {getUsersForSidebar} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/users',protectedRoute,getUsersForSidebar)
// router.post('/login',login)
// router.post('/logout',logout)
// router.post('/update-profile',protectedRoute,updateProfile)
// router.get('/check',protectedRoute,checkAuth)
export default router;