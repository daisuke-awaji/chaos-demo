import React from 'react';
import Regions from './components/Regions';
import Aframe from './components/Aframe';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component={Regions} />
      <Route path='/aframe' component={Aframe} />
    </div>
  </BrowserRouter>
)

export default App;
