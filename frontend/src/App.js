import { Toaster } from 'react-hot-toast';
import Sidebar from './Components/sidebar/Sidebar';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import GroupList from './Groups/GroupList';
import CreateGroup from './Groups/CreateGroup';
import GroupChat from './Groups/GroupChat';


function App() {
  const {authUser} = useAuthContext();
  console.log('123',authUser);
  // localStorage.setItem('color','ankit');
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to ={'/login'} />  } />
         <Route path='/login' element={authUser ? <Navigate to = '/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to = '/' /> : <Signup />} /> 
        
        <Route path='/groups/create' element={authUser ? <CreateGroup /> : <Navigate to='/login' />} />
        <Route path='/groups/:id' element={authUser ? <GroupChat /> : <Navigate to='/login' />} />
        <Route path='/groups' element={authUser ? <GroupList /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />

    </div>
  );
}

export default App;
