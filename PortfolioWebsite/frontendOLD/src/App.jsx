import "./App.css"
import Home from "./Home/Home.jsx"
import NavBar from "./NavBar/NavBar.jsx"
import AboutMe from "./AboutMe/AboutMe.jsx"
import Projects from "./Projects/Projects.jsx"
import ContactMe from "./ContactMe/ContactMe.jsx"
import Modal from "./Modals/Modal"
import {ContextWrapper} from "./ContextWrapper"

export default function App() {

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  return (
    <ContextWrapper>
        <Modal />
        <Home />
        <NavBar isElementInViewport = {isElementInViewport}/>
        <AboutMe isElementInViewport = {isElementInViewport} />
        <Projects isElementInViewport = {isElementInViewport} />
        <ContactMe isElementInViewport = {isElementInViewport} />
    </ContextWrapper>
  );
}

