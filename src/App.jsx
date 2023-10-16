import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
    <Router>
        <Routes>
          <Route exact path='/' element={< Home />}/>
          <Route exact path='/auth' element={< Auth />}/>
          <Route exact path='/shop' element={< Shop />}/>
          <Route exact path='/admin' element={< Admin />}/>
          <Route exact path='/product/:id' element={< Product />}/>
          <Route exact path='/orders' element={< Orders />}/>
          <Route exact path='/cart' element={< Cart />}/>

          {/* Not found */}
          {/* <Route path='*' element={ <Navigate to="/404" /> } /> */}
          {/* <Route path='/404' element={< NotFound />} /> */}
        </Routes>
      </Router>
      </AuthContextProvider>
  );
}

export default App;
