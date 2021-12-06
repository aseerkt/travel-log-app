import { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import MapWrapper from '../components/MapWrapper';
import MarkerPin from '../components/MarkerPin';
import Rating from '../components/Rating';
import useDeleteLogMutation from '../hooks/mutations/useDeleteLogMutation';
import useFetchOneLog from '../hooks/queries/useFetchOneLog';
import useMeQuery from '../hooks/queries/useMeQuery';
import { freezeMapSettings } from '../utils/freezeMapSettings';

import './LogPage.css';

const LogPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchOneLog(id);
  const navigate = useNavigate();
  const { data: meData } = useMeQuery();
  const { mutateAsync: deleteLogAsync } = useDeleteLogMutation();

  const [location, setLocation] = useState({
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
    zoom: 8,
  });

  useEffect(() => {
    setLocation({
      ...location,
      latitude: data?.latitude || 0,
      longitude: data?.longitude || 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Loader info='Loading log...' />;
  } else if (!data) {
    return (
      <div className='container'>
        <h3>Something went wrong</h3>
      </div>
    );
  }

  return (
    <div className='container log-page-container'>
      <section className='detail-section'>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>{data?.comments}</p>
        <p>Visited on {new Date(data?.visitDate).toLocaleDateString()}</p>
        <p>
          <strong>Author rating:</strong>
        </p>
        <Rating rating={data.rating} />
        <div className='btn-group'>
          {meData?.user._id === data.user && (
            <button
              className='trash_btn'
              onClick={() => {
                deleteLogAsync(data?._id, {
                  onSuccess: () => {
                    navigate('/');
                  },
                });
              }}
            >
              <i aria-label='delete log' className='fas fa-trash'></i>
            </button>
          )}
        </div>
      </section>
      <section className='map-section'>
        <MapWrapper
          locationState={{ location, setLocation }}
          viewportState={{
            viewport: {
              width: '100%',
              height: '100%',
            },
          }}
          {...freezeMapSettings}
        >
          <Marker {...location}>
            <div>
              <MarkerPin markerSize={5} />
            </div>
          </Marker>
        </MapWrapper>
      </section>
    </div>
  );
};

export default LogPage;
