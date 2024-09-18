import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';

const App = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;