interface MarkerPinProps {
  markerSize: number;
  markerColor?: string;
}

const MarkerPin: React.FC<MarkerPinProps> = ({
  markerSize,
  markerColor = '#f8f22c',
}) => {
  return (
    <svg
      className='marker-svg'
      viewBox='0 0 24 24'
      style={{
        width: `${markerSize * 8}px`,
        height: `${markerSize * 8}px`,
      }}
      stroke={markerColor}
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
      <circle cx='12' cy='10' r='3'></circle>
    </svg>
  );
};

export default MarkerPin;
