import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import AddLogEntryForm from './AddLogEntryForm';
import { listLogEntries } from './API';
import Header from './Header';

/**
 * JSDoc
 * Log Entry Definitions
 @typedef {Object} LogEntry
 @property {string} _id
 @property {number} latitude
 @property {number} longitude
 @property {string} title
 @property {string} comments
 @property {string} description
 */

const App = () => {
  /** @type {[LogEntry[], any]} */
  const [logEntries, SetLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEventLocation, setAddEventLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 60px)',
    latitude: 27.1751448,
    longitude: 78.0399535,
    zoom: 5,
  });

  console.log(logEntries);

  const setEntries = async () => {
    const logEntries = await listLogEntries();
    SetLogEntries(logEntries);
  };

  useEffect(() => {
    setEntries();
  }, []);

  const addNewLocation = (event) => {
    const [longitude, latitude] = event.lngLat;
    setShowPopup({});
    setAddEventLocation({
      latitude,
      longitude,
    });
  };

  return (
    <>
      <Header />
      <ReactMapGL
        {...viewport}
        style={{
          marginTop: 0,
        }}
        mapStyle='mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onDblClick={addNewLocation}
      >
        {logEntries.map((entry) => (
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
                  stroke-width='2'
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
              latitude={addEventLocation.latitude}
              longitude={addEventLocation.longitude}
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
                  stroke-width='2'
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
              latitude={addEventLocation.latitude}
              longitude={addEventLocation.longitude}
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
                    setAddEventLocation({});
                    setEntries();
                  }}
                  location={{
                    latitude: addEventLocation.latitude,
                    longitude: addEventLocation.longitude,
                  }}
                />
              </div>
            </Popup>
          </>
        )}
      </ReactMapGL>
    </>
  );
};

export default App;
