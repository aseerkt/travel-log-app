import ReactMapGL from 'react-map-gl';
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';

type LocationState = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Dimension = {
  width: string;
  height: string;
};

type MapWrapperProps = InteractiveMapProps & {
  locationState: {
    location: LocationState;
    setLocation: React.Dispatch<React.SetStateAction<LocationState>>;
  };
  viewportState: {
    viewport: Dimension;
  };
};

const MapWrapper: React.FC<MapWrapperProps> = ({
  locationState,
  viewportState,
  children,
  ...props
}) => {
  const { location, setLocation } = locationState;
  const {
    viewport: { width, height },
  } = viewportState;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflowY: 'auto',
      }}
    >
      <ReactMapGL
        {...location}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/aseerkt/ckuo1lzqbaoxp17nvcqzg82em'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport: any) => setLocation(nextViewport)}
        {...props}
      >
        {children}
      </ReactMapGL>
    </div>
  );
};

export default MapWrapper;
