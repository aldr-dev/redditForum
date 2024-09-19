import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectGetPostsLoading, selectPostsData} from './postsSlice';
import {toast} from 'react-toastify';
import {getPostsData} from './postsThunks';
import {Box, CircularProgress, Typography} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PostCard from './components/PostCard';

const Post = () => {
  const dispatch = useAppDispatch();
  const postsData = useAppSelector(selectPostsData);
  const loading = useAppSelector(selectGetPostsLoading);

  useEffect(() => {
    const fetchPostsData =  async () => {
      try {
        await dispatch(getPostsData()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchPostsData();
  }, [dispatch]);


  return (
    <>
      {loading ? (<CircularProgress sx={{color: '#ff4500'}}/>) : (
        <>
          {postsData.length === 0 ? (
            <Typography sx={{display: 'flex', alignItems: 'center'}} variant="body2" color="#000"><InfoIcon />&nbsp;В данный момент список публикаций пуст, но мы уже работаем над их
              добавлением. Спасибо за ваше терпение!</Typography>) : (
            <Box display="flex" sx={{mb: 2, maxHeight: 'calc(100vh - 121px)', overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px', padding: '15px'}} gap={1} flexWrap="wrap">
              {postsData.map((post) => (
                <PostCard key={post._id} post={post}/>
              ))}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Post;