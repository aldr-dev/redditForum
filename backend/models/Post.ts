import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import { PostFields } from '../types';

const PostSchema = new mongoose.Schema<PostFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    }
  },
  title: {
    type: String,
    required: [true, 'Заголовок, это обязательное поле!'],
  },
  description: {
    type: String,
    validate: {
      validator: function (value: string) {
        return Boolean(value || this.image);
      },
      message: 'Описание или изображение должно присутствовать!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (value: string) {
        return Boolean(value || this.description);
      },
      message: 'Изображение или описание должно присутствовать!',
    },
  },
  datetime: Date,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
