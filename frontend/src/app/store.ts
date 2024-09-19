import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {usersReducer} from '../features/users/usersSlice';
import {postsReducer} from '../features/posts/postsSlice';
import {commentsReducer} from '../features/comments/commentsSlice';

const userPersistConfig = {
  key: 'redditForum:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;