import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;