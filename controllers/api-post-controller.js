const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error.message)
};

const getPost = (req, res) => {
  Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
}

const deletePost = (req, res) => {
  Post
  .findByIdAndDelete(req.params.id)
  .then(() => res.status(200).json(req.params.id))
  .catch((error) => handleError(res, error));
}



const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(req.params.id, { title, author, text })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
}

const getPosts = (req, res) => {
  Post
    .find()
    .sort({ time: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
}


const addPost = (req, res) => {
  const time = new Date()
  const {title , author, text} = req.body
  const post = new Post({title, author, text, time})
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
}

module.exports = {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
};
