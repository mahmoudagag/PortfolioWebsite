
import LoginForm from './Components/LoginForm/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Register} from './Components/register'
import Dashboard from './Components/dashboard';
import NotFound from './Components/NotFound';

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BACKEND_URL || "/"}>
      <Routes>
        <Route path='/' element = {<Dashboard/>} />
        {/* <Route path='/stockpapertrading/' element = {<Dashboard/>} /> */}
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
