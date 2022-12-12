import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App style={{ background: '#333'}} />
  </BrowserRouter>,
  document.getElementById('root')
);
