import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import MyMapComponent from './Map';
import registerServiceWorker from './registerServiceWorker';
import MapWithADirectionsRenderer from './Directions'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
