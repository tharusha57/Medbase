import Home from './pages/Home/Home'
import SignupUser from './pages/Signup/SignupUser';
import SignupDoctor from './pages/Signup/SignupDoctor';
import LoginUser from "./pages/Login/LoginUser";
import MedicineLog from './pages/MedicineLog/MedicineLog';
import Notes from './pages/Notes/Notes';

import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={!user ? <LoginUser/> : <Navigate to='/medbase/:id' />}></Route>
            <Route path='signupuser' element={<SignupUser />} />
            <Route path='signupdoctor' element={!user ? <SignupDoctor /> : <Navigate to='/medbase/:id' />}></Route>
          </Route>

          <Route path='/medbase/:id'>
            <Route index element={user ? <Home /> : <Navigate to='/login'/>} />
          </Route>

          <Route path='/medbase/medicinelog/:id'>
            <Route index element={user ? <MedicineLog />  : <Navigate to='/login' />} />
          </Route>

          <Route path='/medbase/notes/:id'>
            <Route index element={user ? <Notes /> : <Navigate to='/login' />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
