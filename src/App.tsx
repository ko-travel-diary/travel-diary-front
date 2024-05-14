import React from 'react';
import './App.css';
import Container from './layouts/Container';
import { Map } from 'react-kakao-maps-sdk';
import { Route, Routes } from 'react-router';
import Main from './views/Main';

function App() {
  return (
    <Routes>
        <Route element={<Container />}>
          <Route index element={<Main />} />
        </Route>
    </Routes>
    
    
  );
}

export default App;
