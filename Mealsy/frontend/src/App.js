import React, { useState, useContext } from "react";
import './App.css';
import Calendar from "./components/Calendar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Profile from "./components/Profile";
import RecipeCollection from "./components/RecipeCollection";
import AboutUs from "./components/AboutUs";
import {useNavigate} from 'react-router-dom';
import GlobalContext from "./context/GlobalContext";

const navigation = [
  { name: 'Calendar', href: '/calendar' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'About Us', href: '/aboutus' },
]

function Navigation(props) {
  const { token, setToken, setUser } = useContext(GlobalContext);
  const [ menuHidden, setMenuHidden ] = useState(true);
  const [ menuDisplay, setMenuDisplay ] = useState('hidden sm:hidden');

  const navigate = useNavigate();

  function handleMenu() {
    setMenuHidden(!menuHidden);
    if (menuHidden === true) {
      setMenuDisplay('hidden sm:hidden');
    } else {
      setMenuDisplay('block w-full sm:hidden');
    }
  }

  function signOut(){
    setToken(null)
    setUser(null)

  }
  return (
    <div className="px-6 pt-5 pb-2 lg:px-8">
      <div>
        <nav className="bg-transparent flex h-9 items-center justify-between" aria-label="Global">
          <div className="flex lg:min-w-0 lg:flex-1 align-top group" aria-label="Global">
            <NavLink to="/">
              <span className = "material-icons-outlined text-gray-900 group-hover:text-green-900 mx-2">
                fastfood
              </span>
            </NavLink>
            <NavLink to="/" className="align-top font-bold text-gray-900 group-hover:text-green-900">
              Mealsy
            </NavLink>
          </div>
          <div className="hidden sm:flex lg:min-w-0 flex-1 justify-center items-center sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} onClick={()=>navigate(item.href)} className="font-semibold text-gray-900 hover:text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden sm:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <NavLink to="/profile" className="inline-block rounded-lg px-8 ml-2 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-green-800/10 hover:ring-green-900/20 hover:bg-green-800 hover:text-slate-100"
            >
              Profile
            </NavLink>
            {token === null && <NavLink to="/login" className="inline-block rounded-lg px-3 ml-2 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-green-800/10 hover:ring-green-900/20 hover:bg-green-800 hover:text-slate-100">
              Log in
            </NavLink>}
            {token && <NavLink onClick={signOut} to="/" className="inline-block rounded-lg px-3 ml-2 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-green-800/10 hover:ring-green-900/20 hover:bg-green-800 hover:text-slate-100">
              Log out
            </NavLink>}
          </div>
        </nav>
      </div>
    </div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/recipes" element={<RecipeCollection />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;