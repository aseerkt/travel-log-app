import { useState } from 'react';
import ReactMapGL, { MapEvent, Marker, Popup } from 'react-map-gl';
import { useQuery } from 'react-query';
import AddLogEntryForm from '../components/AddLogEntryForm';
import { fetchMyLogs } from '../services/logs';
import { LogEntryDoc } from '../types/LogEntry';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

// @ts-ignore
mapboxgl.workerClass = MapboxWorker;

const MapPage = () => {
  const { data: logEntries, isLoading } = useQuery<LogEntryDoc[]>(
    'myLogs',
    fetchMyLogs
  );
  const [showPopup, setShowPopup] = useState<Record<string, boolean>>({});
  const [addEventLocation, setAddEventLocation] = useState<{
    latitude?: number;
    longitude?: number;
  } | null>(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 60px)',
    latitude: 27.1751448,
    longitude: 78.0399535,
    zoom: 5,
  });

  const addNewLocation = (event: MapEvent) => {
    const [longitude, latitude] = event.lngLat;
    setShowPopup({});
    setAddEventLocation({
      latitude,
      longitude,
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      onDblClick={addNewLocation}
      onResize={() => {
        setViewport((vp) => ({ ...vp, width: '100vw' }));
      }}
    >
      {logEntries &&
        logEntries.map((entry) => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => {
                  setShowPopup({ [entry._id]: true });
                }}
              >
                <svg
                  className='marker-svg'
                  viewBox='0 0 24 24'
                  style={{
                    width: `${viewport.zoom * 8}px`,
                    height: `${viewport.zoom * 8}px`,
                  }}
                  stroke='#f8f22c'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                  <circle cx='12' cy='10' r='3'></circle>
                </svg>
              </div>
            </Marker>
            {showPopup[entry._id] && (
              <Popup
                key={entry.latitude + entry.longitude}
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({})}
                dynamicPosition={true}
                anchor='top'
              >
                <div className='popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>
                    Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            )}
          </>
        ))}
      {addEventLocation && (
        <>
          <Marker
            key={JSON.stringify(addEventLocation)}
            latitude={addEventLocation.latitude!}
            longitude={addEventLocation.longitude!}
          >
            <div>
              <svg
                className='marker-svg'
                viewBox='0 0 24 24'
                style={{
                  width: `${viewport.zoom * 8}px`,
                  height: `${viewport.zoom * 8}px`,
                }}
                stroke='#f8f22c'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                <circle cx='12' cy='10' r='3'></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            key={JSON.stringify(addEventLocation) + Math.random() * 100}
            latitude={addEventLocation.latitude!}
            longitude={addEventLocation.longitude!}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEventLocation(null)}
            dynamicPosition={true}
            anchor='top'
          >
            <div className='popup'>
              <h3>Add Event Here</h3>
              <AddLogEntryForm
                onClose={() => {
                  setAddEventLocation(null);
                }}
                location={{
                  latitude: addEventLocation.latitude!,
                  longitude: addEventLocation.longitude!,
                }}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
};

export default MapPage;
