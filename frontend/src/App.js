import { Toaster } from 'react-hot-toast';
import Sidebar from './Components/sidebar/Sidebar';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';


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
        {/* it is saying 'undefined is not valid json', although local storage is set and not navigating to home page after clicking signup button */}
        {/* <Route path='/signup' element={<Signup />} /> */}
        {/* <Route path='/login' element={<Login />} />  */}
      </Routes>
      <Toaster />

    </div>
  );
}

export default App;
