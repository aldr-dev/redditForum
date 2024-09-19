import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import {getOnePostData} from './postsThunks';
import {getCommentsData} from '../comments/commentsThunks';
import {selectGetFullPostLoading, selectOnePostData} from './postsSlice';
import {Avatar, Box, CardMedia, CircularProgress, Container, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {API_URL} from '../../config';
import {selectUser} from '../users/usersSlice';
import CommentForm from '../comments/components/CommentForm';
import {selectCommentsData, selectGetCommentsLoading} from '../comments/commentsSlice';
import CommentItem from '../comments/components/CommentItem';

const FullPost = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const commentsData = useAppSelector(selectCommentsData);
  const onePostData = useAppSelector(selectOnePostData);
  const loading = useAppSelector(selectGetFullPostLoading);
  const loadingComments = useAppSelector(selectGetCommentsLoading);

  useEffect(() => {
    const fetchOnePostAndDataComments = async () => {
      if (id) {
        try {
          await dispatch(getOnePostData(id)).unwrap();
          await dispatch(getCommentsData(id)).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
        }
      }
    };

    void fetchOnePostAndDataComments();
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <CircularProgress sx={{color: '#ff4500'}}/>
      ) : (
        onePostData && (
          <Container sx={{mb: 5}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4}}>
              <Box sx={{display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>
                <Avatar sx={{width: 28, height: 28, mr: 1, fontWeight: 'normal'}}>
                  {onePostData.user.username.charAt(0).toUpperCase()}
                </Avatar>
                {onePostData.user.username}
              </Box>
              <Typography variant="body1" color="text.secondary">
                {dayjs(onePostData.datetime).format('DD.MM.YYYY HH:mm')}
              </Typography>
            </Box>

            <Box sx={{mb: 5}}>
              {!onePostData.image && (
                <Typography
                  sx={{ mb: 2 }}
                  color="#ff4500"
                  variant="h6"
                  component="label"
                  display="flex"
                  alignItems="center">
                  <ChatIcon sx={{ marginRight: 1 }} />
                  Обсуждение
                </Typography>
              )}
              <Typography variant="h4" sx={{mb: 2}}>
                {onePostData.title}
              </Typography>
              <Typography variant="body1">{onePostData.description}</Typography>
            </Box>

            <Box sx={{mb: 5}}>
              {onePostData.image ? (
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: '600px',
                    borderRadius: 3,
                    objectFit: 'cover',
                  }}
                  image={`${API_URL}/${onePostData.image}`}
                  alt="full post image"
                />
              ) : null}
            </Box>

            {!user && (
              <Typography sx={{ display: 'flex', alignItems: 'center', mb: 3 }} variant="body1">
                <InfoIcon />
                &nbsp;Комментарии могут оставлять, только зарегистрированные пользователи!
              </Typography>
            )}
            {user && id && (
              <CommentForm user={user} postId={id} />
            )}

            <Typography sx={{mt: 2, mb: 2}} variant="h5">Комментарии:</Typography>
            {loadingComments ? (<CircularProgress sx={{color: '#ff4500'}}/>) : (
              <>
                {commentsData.length === 0 ? (
                  <Typography sx={{display: 'flex', alignItems: 'center'}} variant="body2" color="#000"><InfoIcon />&nbsp;В данный момент список комментариев пуст, оставьте Ваш первый комментарий.</Typography>) : (
                  <Box>
                    {commentsData.map((comment) => (
                      <CommentItem key={comment._id} comment={comment}/>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Container>
        )
      )}
    </>
  );
};

export default FullPost;