import React from 'react';
import ReactDOM from 'react-dom/client';

//components
import App from './App';

//styles
import './styles/index.scss';
import './styles/reset.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
