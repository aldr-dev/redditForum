import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentsData, CommentsMutation, GlobalError} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const postCommentData = createAsyncThunk<void, CommentsMutation, { state: RootState; rejectValue: GlobalError }>(
  'comments/postCommentData', async (comment, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return;
      }

      await axiosApi.post<CommentsMutation>('/comments', comment, {headers: {'Authorization': `Bearer ${token}`}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  });

export const getCommentsData = createAsyncThunk<CommentsData[], string, { state: RootState }>(
  'comments/getCommentsData', async (postId) => {
    const {data: commentsData} = await axiosApi.get<CommentsData[]>(`/comments/?post=${postId}`);
    return commentsData;
  });