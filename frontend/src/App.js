import AppState from './context/State';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { useEffect, useState } from 'react';
import { EditProfile } from './components/EditProfile';
import snackBar from './snackBar';
import { Home } from './components/Home';
import { AddPost } from './components/AddPost';
import { UserPosts } from './components/UserPosts';
import { Post } from './components/Post';
import { Header } from './components/Header';

function App() {
  const [progress, setProgress] = useState(0) //for loading bar
  window.addEventListener('offline', () => snackBar('you are offline',5000));
  
  return (
    <AppState>
      <LoadingBar color='red' progress={progress} loaderSpeed={1000} shadow={true} onLoaderFinished={() => setProgress(0)} />
      <Router>
      <Footer setProgress={setProgress}/>
      <Header/>
      <div className='my-[50px]'></div>
        <Routes>
          <Route exact path='/' element={<Home/>}  />
          <Route exact path='/addpost' element={<AddPost/>}  />
          <Route exact path='/editprofile' element={<EditProfile setProgress={setProgress}/>}/>
          <Route exact path='/signup' element={<Signup setProgress={setProgress}/>}/>
          <Route exact path='/login' element={<Login setProgress={setProgress}/>}/>
          <Route exact path='/user/:author_name' element={<UserPosts/>}/>
          <Route exact path='/post/:id' element={<Post/>}/>
        </Routes>
          <div className='my-[50px] h-[1px]'></div>
      </Router>
    </AppState>
  );
}

export default App;
