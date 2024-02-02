import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Chatbot from './chatbot/Chatbot';
import Hero from "./components/hero/Hero";
import Parallax from "./components/parallax/Parallax";
import Content from "./components/content/Content";
import Project from "./components/project/Project";
import Contact from "./components/contact/Contact";
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About";
import "./app.scss";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null;
};


const App = () => {

  
  React.useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY === 0) {
        console.log('xxx');
        // Disable scrolling
        document.body.style.webkitOverscrollBehaviorY = 'none';
      } else {
        // Enable scrolling
        document.body.style.webkitOverscrollBehaviorY = 'auto';
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <Router>
      <ScrollToTop />
      <Chatbot />
      <Routes>
        {/* The Portfolio Route */}
        <Route path="/portfolio" element={<Portfolio />} />

        {/* The Main Page Route */}
        <Route path="/" element={
          <>
            <section id="Homepage">
              <Navbar />
              <Hero />
            </section>
            <section id="About">
              <About />
            </section>
            <section id="Content">
              <Parallax type="content" />
            </section>
            <section id="ContentSection">
              <Content />
            </section>
            <section id="Project">
              <Parallax type="project" />
            </section>
            <Project />
            <section id="Contact">
              <Contact />
            </section>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;