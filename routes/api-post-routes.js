const express = require('express');
const {
  getPost, 
  deletePost,
  editPost,
  getPosts,
  addPost
} = require('../controllers/api-post-controller');

const router = express.Router();

//All posts
router.get('/api/posts', getPosts);
//Add new post
router.post('/api/post', addPost);
//Get Post by ID
router.get('/api/post/:id', getPost);
//Delete Post by ID
router.delete('/api/post/:id', deletePost);
//Update Post by ID
router.put('api/post/:id', editPost);


module.exports = router;
