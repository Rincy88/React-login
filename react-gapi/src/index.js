import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Keyprog from './keyprog'

ReactDOM.render(
  <React.StrictMode>
      
      <Router>
      <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/keyprog" element={<Keyprog />}></Route>
      
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
