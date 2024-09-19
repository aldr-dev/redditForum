import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {useAppSelector} from '../../app/hooks';
import {selectPostError} from '../../features/posts/postsSlice';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  resetFileName: boolean;
  handleResetFileName: (status: boolean) => void;
}

const FileInput: React.FC<Props> = ({onChange, name, label, resetFileName, handleResetFileName}) => {
  const error = useAppSelector(selectPostError);
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (resetFileName) {
      setFilename('');
      handleResetFileName(false);
    }
  }, [resetFileName, handleResetFileName]);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFilename(event.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(event);
  };

  return (
    <>
      <input type="file" name={name} style={{display: 'none'}} ref={inputRef} onChange={onFileChange}/>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label={label}
            InputProps={{readOnly: true}}
            value={filename}
            onClick={activateInput}
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')}
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
          <Button
            variant="outlined"
            onClick={activateInput}
            sx={{
              color: '#000',
              borderColor: '#FF4500',
              '&:hover': {
                borderColor: '#d53c03',
              }
            }}>
            Выбрать
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;