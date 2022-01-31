import React, {useState, useContext, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Wifi from './pages/Wifi';
import NoMatch from './pages/NoMatch';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthContext from './contexts/AuthContext';
import fire from './utils/firebase';

function App() {
  const [isAuthenticated, setAuthentication] = useState(useContext(AuthContext));

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged(user => {
      user ?
        setAuthentication(true) :
        setAuthentication(false);
      unsubscribe(); // terminate the observer after completion
    });
  }, []);

  function renderHome() {
    if (isAuthenticated === false) {
      return <Login />;
    } else if (isAuthenticated === true) {
      return <Home />;
    } else {
      return null;
    }
  }

  function renderSettings() {
    if (isAuthenticated === false) {
      return <Login />;
    } else if (isAuthenticated === true) {
      return <Settings />;
    } else {
      return null;
    }
  }

  return (
    <AuthContext.Provider value={[isAuthenticated, setAuthentication]}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={renderHome()}/>
            <Route path="/login" element={<Login /> }/>
            <Route path="/signup" element={<Signup /> }/>
            <Route path="/settings" element={renderSettings()} />
            <Route path="/wifi" element={<Wifi /> }/>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
        </Router>
    </AuthContext.Provider>
  
  );
}

export default App;
