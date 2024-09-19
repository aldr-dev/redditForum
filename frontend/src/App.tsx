import {Container} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NavBar from './UI/NavBar/NavBar';
import Post from './features/posts/Post';
import PostForm from './features/posts/components/PostForm';

const App = () => {
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Post/>}/>
          <Route path="/add-new-post" element={<PostForm/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;