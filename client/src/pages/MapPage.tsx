import { useEffect, useState } from 'react';
import { MapEvent, Marker, Popup } from 'react-map-gl';
import MarkerPin from '../components/MarkerPin';
import useFetchMyLogs from '../hooks/queries/useFetchMyLogs';
import Loader from '../components/Loader';
import MapWrapper from '../components/MapWrapper';
import './MapPage.css';
import AddLogEntryForm from '../components/AddLogEntryForm';

type Location = {
  longitude: number;
  latitude: number;
};
const freezeMapSettings = {
  dragPan: false,
  dragRotate: false,
  scrollZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false,
  doubleClickZoom: false,
};

const MapPage = () => {
  const { data: logEntries, isLoading } = useFetchMyLogs();
  const [showPopup, setShowPopup] = useState<Record<string, boolean>>({});
  const [newLocation, setNewLocation] = useState<Location | null>(null);
  const [confirmLoc, setConfirmLoc] = useState<Location | null>(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 'calc(100vh - 60px)',
  });
  const [location, setLocation] = useState({
    latitude: 27.1751448,
    longitude: 78.0399535,
    zoom: 5,
  });

  const addNewLocation = (event: MapEvent) => {
    console.log(event);
    setConfirmLoc(null);
    const [longitude, latitude] = event.lngLat;
    setShowPopup({});
    setNewLocation({
      latitude,
      longitude,
    });
    setLocation({ ...location, latitude, longitude });
  };

  useEffect(() => {
    if (confirmLoc) {
      setViewport({ ...viewport, width: '50vw' });
    } else {
      setViewport({ ...viewport, width: '100vw' });
    }
  }, [confirmLoc]);

  if (isLoading) {
    return <Loader info='Loading map...' />;
  }

  return (
    <MapWrapper
      viewportState={{ viewport, setViewport }}
      locationState={{ location, setLocation }}
      onDblClick={(e) => {
        e.stopImmediatePropagation();
        if (!confirmLoc) {
          addNewLocation(e);
        }
      }}
      // Freeze map after confirming the location
      {...(confirmLoc && freezeMapSettings)}
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
                <MarkerPin markerSize={location.zoom} />
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
      {newLocation && (
        <>
          <Marker
            key={JSON.stringify(newLocation)}
            latitude={newLocation.latitude!}
            longitude={newLocation.longitude!}
          >
            <div>
              <MarkerPin markerSize={location.zoom} markerColor='red' />
            </div>
          </Marker>
          <Popup
            key={JSON.stringify(newLocation) + Math.random() * 100}
            latitude={newLocation.latitude!}
            longitude={newLocation.longitude!}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setNewLocation(null);
              if (confirmLoc) {
                setConfirmLoc(null);
              }
            }}
            dynamicPosition={true}
            anchor='top'
          >
            <div className='popup'>
              {!confirmLoc && <h3>Confirm Location</h3>}
              <ul className='new-location-wrapper'>
                <li>
                  <strong>Latitude: </strong> {newLocation.latitude}
                </li>
                <li>
                  <strong>Longitude: </strong> {newLocation.longitude}
                </li>
              </ul>
              <button
                onClick={() => {
                  setConfirmLoc(newLocation);
                  setLocation({
                    ...location,
                    longitude: newLocation.longitude,
                    latitude: newLocation.latitude,
                  });
                }}
                disabled={!!confirmLoc}
              >
                {confirmLoc ? 'Location selected' : 'Select location'}
              </button>
            </div>
          </Popup>
        </>
      )}
      {confirmLoc && newLocation && (
        <div className='add-log-wrapper'>
          <div className='add-log-header'>
            <h2>Add Log</h2>
            <i onClick={() => setConfirmLoc(null)} className='fas fa-times'></i>
          </div>
          <AddLogEntryForm location={confirmLoc} />
        </div>
      )}
    </MapWrapper>
  );
};

export default MapPage;
