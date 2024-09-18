import {Button, Grid, styled} from '@mui/material';
import {NavLink} from 'react-router-dom';

const ActiveLink = styled(NavLink)({
  borderTop: '1px solid transparent',
  borderRadius: '0',
  transition: 'border-color 0.3s ease',
  '&.active': {
    borderTop: '1px solid #FF4500',
    borderRadius: '0',
  },
  '&:hover': {
    color: '#FF4500',
  },
});

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button component={ActiveLink} to="/register" color="inherit">
        Регистрация
      </Button>
      <Button component={ActiveLink} to="/login" color="inherit">
        Авторизация
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;