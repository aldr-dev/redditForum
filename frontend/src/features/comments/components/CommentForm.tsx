import {Avatar, Box, Container, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {CommentsForm, CommentsMutation, User} from '../../../types';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {getCommentsData, postCommentData} from '../commentsThunks';
import {selectCreateError, selectPostLoading} from '../commentsSlice';
import {LoadingButton} from '@mui/lab';
import {toast} from 'react-toastify';

interface Props {
  user: User;
  postId: string;
}

const CommentForm: React.FC<Props> = ({user, postId}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const errorValidateInput = useAppSelector(selectCreateError);
  const [state, setState] = useState<CommentsForm>({
    text: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      try {
        const commentData: CommentsMutation = {
          post: postId,
          text: state.text,
        };

        if (state.text.trim().length !== 0) {

        if (errorValidateInput) {
          toast.error(errorValidateInput.error);
        }
          await dispatch((postCommentData(commentData))).unwrap();
          await dispatch(getCommentsData(postId)).unwrap();

          setState({
            text: '',
          });
        }
      } catch (error) {
        console.error('Произошла ошибка при попытке оставить комментарий. Пожалуйста, попробуйте позже. ' + error);
      }
    }
  };

  return (
    <>
      <Container component="form" onSubmit={submitFormHandler}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Avatar sx={{width: 40, height: 40, mr: 1, fontWeight: 'normal'}}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <TextField
              onChange={inputChangeHandler}
              label="Оставьте ваш комментарий"
              multiline
              name="text"
              value={state.text}
              required
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: '#fff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FF4500',
                  },
                  '&:hover fieldset': {
                    borderColor: '#c23701',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF4500',
                  },
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #fff inset',
                  WebkitTextFillColor: '#fff !important',
                },
                '& input': {
                  color: '#000',
                },
                '&.Mui-error': {
                  '& input': {
                    backgroundColor: '#000',
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#000',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}/>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            sx={{
              mt: 2,
              color: '#fff',
              background: '#FF4500',
              '&:hover': {
                background: '#d53c03',
              }
            }}
            color="primary"
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<SendIcon/>}
            variant="contained">
            <span>Отправить</span>
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
};

export default CommentForm;