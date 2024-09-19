import {createSlice} from '@reduxjs/toolkit';
import {OnePostData, PostsData, ValidationError} from '../../types';

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
  extraReducers: () => {},
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