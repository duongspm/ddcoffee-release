//chua cac router, goi lai cho de
import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get('/',getPosts);

router.post('/', createPost);

router.post('/updatePost', updatePost);

export default router;