import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NoMatch from './pages/NoMatch';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div>
        <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Home /> }/>
              <Route path="/login/" element={<SignIn /> }/>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Router>
        <Footer />
    </div>
  );
}

export default App;
