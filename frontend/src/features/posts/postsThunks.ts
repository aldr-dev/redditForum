import {createAsyncThunk} from '@reduxjs/toolkit';
import {OnePostData, PostMutation, PostsData, ValidationError} from '../../types';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';

export const sendPostData = createAsyncThunk<void, PostMutation, {state: RootState, rejectValue: ValidationError}>(
  'posts/sendPostData', async (data, {getState, rejectWithValue}) => {
  try {
    const token = getState().users.user?.token;

    if (!token) {
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.image) {
      formData.append('image', data.image);
    }

    await axiosApi.post<PostMutation>('/posts', formData, {headers: {'Authorization': `Bearer ${token}`}});
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const getPostsData = createAsyncThunk<PostsData[], void, {state: RootState}>(
  'posts/getPostsData', async () => {
    const {data: postsData} = await axiosApi.get<PostsData[]>('/posts');
    return postsData;
});

export const getOnePostData = createAsyncThunk<OnePostData, string, {state: RootState}>(
  'posts/getOnePostData', async (id) => {
    const {data: onePostData} = await axiosApi.get<OnePostData>(`/posts/${id}` );
    return onePostData;
});