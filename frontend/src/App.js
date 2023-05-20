import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js'
import Main from './pages/Main.js'
import Home from './pages/Home.js'
import useToken from './components/useToken.js'
import { TokenContext } from './TokenContext';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      <BrowserRouter>
          <>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/main" element={<Main />}></Route>
          </Routes>
          </>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
