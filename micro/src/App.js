import React from 'react';
import Home from "./screen/Home";
import Post from "./screen/Post";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
