import mongoose, {Schema, Types} from 'mongoose';
import { CommentFields } from '../types';
import User from './User';
import Post from './Post';

const CommentSchema = new mongoose.Schema<CommentFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exists',
    },
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const post = await Post.findById(value);
        return Boolean(post);
      },
      message: 'Post does not exists',
    },
  },
  text: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;