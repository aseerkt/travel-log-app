import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

// @ts-ignore
mapboxgl.workerClass = MapboxWorker;

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
