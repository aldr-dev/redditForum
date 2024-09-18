import express from 'express';
import Comment from '../models/Comment';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const postId = req.query.post as string;

    if (!postId) {
     return res.status(404).send('Post ID not found.');
    }

    const comments = await Comment.find({post: postId})
      .populate('user', '_id username')
      .sort({ _id: -1 });

    return res.send(comments);
  } catch (error) {
    return next(error);
  }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.body.text) {
      return res.status(400).send('Поле комментария, является обязательным!');
    }

    const comment = new Comment({
      user: req.user?._id,
      post: req.body.post,
      text: req.body.text,
    });

    await comment.save();
    return res.send(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default commentsRouter;