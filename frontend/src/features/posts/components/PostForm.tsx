import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {PostMutation} from '../../../types';
import {selectUser} from '../../users/usersSlice';
import {Box, Grid, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import FileInput from '../../../UI/FileInput/FileInput';
import {toast} from 'react-toastify';
import {sendPostData} from '../postsThunks';
import {selectPostError, selectPostLoading} from '../postsSlice';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectPostError);
  const loading = useAppSelector(selectPostLoading);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (user) {
        if (state.title.trim().length !== 0) {

          if (state.description.trim().length === 0 && !state.image) {
            toast.error('Заполните описание или добавьте изображение');
            return;
          }
          await dispatch(sendPostData(state)).unwrap();
          setResetFileName(true);
          setState({
            title: '',
            description: '',
            image: null,
          });
          toast.success('Запись была успешно опубликована.');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке создания записи. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <>
      {user ? null : (<Navigate to="/"/>)}
      <Box component="form" onSubmit={submitFormHandler}>
        <Typography variant={'h4'} sx={{mb: 2}}>Опубликовать новый пост</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Заголовок"
              id="title"
              name="title"
              required
              value={state.title}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
              sx={{
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Описание"
              id="description"
              name="description"
              value={state.description}
              multiline
              rows={4}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}
              sx={{
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
          </Grid>
          <Grid item>
            <FileInput
              onChange={onChangeFileInput}
              label="Изображение"
              name="image"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}/>
          </Grid>
        </Grid>
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
    </>
  );
};

export default PostForm;