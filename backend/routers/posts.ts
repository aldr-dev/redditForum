import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Post from '../models/Post';
import {imagesUpload} from '../multer';

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const post = new Post({
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null,
      datetime: new Date().toISOString(),
    });

    await post.save();
    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

postsRouter.get('/', async (_, res, next) => {
  try {
    const post = await Post.find({}, {description: 0})
      .sort({datetime: -1})
      .populate({
        path: 'user',
        select: 'username -_id',
      });

    return res.send(post);
  } catch (error) {
    return next(error);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(404).send({error: 'ID not found'});
    }

    const post = await Post.findById({_id: postId}).populate({path: 'user', select: 'username -_id',});
    return res.send(post);
  } catch (error) {
    return next(error);
  }
});

export default postsRouter;