import {createSlice} from '@reduxjs/toolkit';
import {OnePostData, PostsData, ValidationError} from '../../types';
import {getOnePostData, getPostsData, sendPostData} from './postsThunks';

interface PostsState {
  postsData: PostsData[];
  onePostData: OnePostData | null;
  postLoading: boolean;
  getPostsLoading: boolean;
  getFullPostLoading: boolean;
  postError: ValidationError | null;
}

const initialState: PostsState = {
  postsData: [],
  onePostData:  null,
  postLoading: false,
  getPostsLoading: false,
  getFullPostLoading: false,
  postError: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendPostData.pending, (state) => {
      state.postLoading = true;
      state.postError = null;
    });
    builder.addCase(sendPostData.fulfilled, (state) => {
      state.postLoading = false;
    });
    builder.addCase(sendPostData.rejected, (state, {payload: error}) => {
      state.postLoading = false;
      state.postError = error || null;
    });

    builder.addCase(getPostsData.pending, (state) => {
      state.getPostsLoading = true;
    });
    builder.addCase(getPostsData.fulfilled, (state, {payload: postsDataArray}) => {
      state.getPostsLoading = false;
      state.postsData = postsDataArray;
    });
    builder.addCase(getPostsData.rejected, (state) => {
      state.getPostsLoading = false;
    });

    builder.addCase(getOnePostData.pending, (state) => {
      state.getFullPostLoading = true;
    });
    builder.addCase(getOnePostData.fulfilled, (state, {payload: onePost}) => {
      state.getFullPostLoading = false;
      state.onePostData = onePost;
    });
    builder.addCase(getOnePostData.rejected, (state) => {
      state.getFullPostLoading = false;
    });
  },
  selectors: {
    selectPostsData: (state) => state.postsData,
    selectOnePostData: (state) => state.onePostData,
    selectPostLoading: (state) => state.postLoading,
    selectGetPostsLoading: (state) => state.getPostsLoading,
    selectGetFullPostLoading: (state) => state.getFullPostLoading,
    selectPostError: (state) => state.postError,
  },
});

export const postsReducer = postsSlice.reducer;
export const {
  selectPostsData,
  selectOnePostData,
  selectPostLoading,
  selectGetPostsLoading,
  selectGetFullPostLoading,
  selectPostError,
} = postsSlice.selectors;