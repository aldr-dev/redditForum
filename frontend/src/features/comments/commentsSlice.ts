import {createSlice} from '@reduxjs/toolkit';
import {CommentsData, GlobalError} from '../../types';
import {getCommentsData, postCommentData} from './commentsThunks';

interface CommentsState {
  commentsData: CommentsData[];
  postLoading: boolean;
  getCommentsLoading: boolean;
  createError: GlobalError | null;
}

const initialState: CommentsState = {
  commentsData: [],
  postLoading: false,
  getCommentsLoading: false,
  createError: null
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCommentData.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(postCommentData.fulfilled, (state) => {
      state.postLoading = false;
    });
    builder.addCase(postCommentData.rejected, (state, {payload: error}) => {
      state.postLoading = false;
      state.createError = error || null;
    });

    builder.addCase(getCommentsData.pending, (state) => {
      state.getCommentsLoading = true;
    });
    builder.addCase(getCommentsData.fulfilled, (state, {payload: commentsDataArray}) => {
      state.getCommentsLoading = false;
      state.commentsData = commentsDataArray;
    });
    builder.addCase(getCommentsData.rejected, (state) => {
      state.getCommentsLoading = false;
    });
  },
  selectors: {
    selectCommentsData: (state) => state.commentsData,
    selectPostLoading: (state) => state.postLoading,
    selectGetCommentsLoading: (state) => state.getCommentsLoading,
    selectCreateError: (state) => state.createError,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {
  selectCommentsData,
  selectPostLoading,
  selectGetCommentsLoading,
  selectCreateError,
} = commentsSlice.selectors;