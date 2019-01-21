import React from 'react';
import Regions from './components/Regions.js'
import {BrowserRouter, Route} from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component={Regions}/>
    </div>
  </BrowserRouter>
)

export default App;
