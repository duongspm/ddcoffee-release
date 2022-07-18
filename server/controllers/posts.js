import { PostModel } from "../models/PostModel.js";

//logic code function
export const getPosts = async(req, res) => {
    try{
        const posts = await PostModel.find();
        console.log('posts',posts);
        res.status(200).json(posts); //return ve cho client 1 status thanh cong la 200 va doan json du lieu post
    }catch(err){
        res.status(500).json({error: err});
    }
};

export const createPost = async(req, res) => {
    try{
        const newPost = req.body;
        
        const post = new PostModel(newPost);
        await post.save();

        res.status(200).json(post);
    }catch(err){
        res.status(500).json({error: err});
    }
};

export const updatePost = async(req, res) => {
    try{
        const updatePost = req.body;
        
        const post = await PostModel.findOneAddUpdate({ _id: updatePost._id}, updatePost, {new: true});
        await post.save();

        res.status(200).json(post);
    }catch(err){
        res.status(500).json({error: err});
    }
};