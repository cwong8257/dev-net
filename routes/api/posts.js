const express = require('express');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

const router = express.Router();

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(404).json({ posts: 'No posts found' });
  }
});

// @route GET api/posts/:postId
// @desc Get post
// @access Private
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.json(post);
  } catch (err) {
    return res.status(404).json({ post: 'No post found' });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { text, name, avatar } = req.body;
  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    return res.json(savedPost);
  } catch (err) {
    errors.server = 'Something went wrong!';
    return res.status(404).json(errors);
  }
});

// @route DELETE api/posts/:postId
// @desc Delete post
// @access Private
router.delete('/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ authorization: 'User not authorized' });
    }
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).json({ post: 'No post found' });
  }
});

// @route POST api/posts/:postId/like
// @desc Like post
// @access Private
router.post('/:postId/like', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ post: 'No post found' });
    }
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ likes: 'User already liked this post' });
    }
    post.likes.unshift({ user: req.user.id });
    const savedPost = await post.save();
    return res.json(savedPost);
  } catch (err) {
    return res.status(404).json({ post: 'No post found' });
  }
});

// @route POST api/posts/:postId/unlike
// @desc Unlike post
// @access Private
router.post(
  '/:postId/unlike',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ post: 'No post found' });
      }
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ likes: 'You have not yet liked this post' });
      }
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      const savedPost = await post.save();
      return res.json(savedPost);
    } catch (err) {
      return res.status(404).json({ post: 'No post found' });
    }
  },
);

// @route POST api/posts/:postId/comments
// @desc Add comment to post
// @access Private
router.post(
  '/:postId/comments',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ post: 'No post found' });
      }
      const { text, name, avatar } = req.body;
      const newComment = {
        text,
        name,
        avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      const savedPost = await post.save();
      return res.json(savedPost);
    } catch (err) {
      return res.status(404).json({ post: 'No post found' });
    }
  },
);

// @route DELETE api/posts/:postId/comments/:commentId
// @desc Remove comment from post
// @access Private
router.delete(
  '/:postId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { postId, commentId } = req.params;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ post: 'No post found' });
      }
      const commentNotFound =
        post.comments.filter(comment => comment._id.toString() === commentId).length === 0;

      if (commentNotFound) {
        return res.status(404).json({ comment: 'Comment not found' });
      }

      const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(commentId);

      if (post.comments[removeIndex].user.toString() !== req.user.id) {
        return res.status(401).json({ authorization: 'User not authorized' });
      }

      post.comments.splice(removeIndex, 1);
      const savedPost = await post.save();
      return res.json(savedPost);
    } catch (err) {
      return res.status(404).json({ post: 'No post found' });
    }
  },
);

module.exports = router;
