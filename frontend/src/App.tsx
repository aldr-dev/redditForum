import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';

const App = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;