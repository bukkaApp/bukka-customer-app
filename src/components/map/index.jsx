import React, { useState } from 'react';
import { GoogleMap, Marker, /* useLoadScript, */ } from '@react-google-maps/api';
import { useLocationContext } from '../../context/LocationContext';
import useScript from '../../hooks/useScript';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import mapStyles from '../../shared/mapStyles.json';
import marker from '../../assets/marker.svg';
import './map.scss';

// &callback=loaderCB01587784933894

const locations = [
  {
    text: "Manfred's Bakery",
    labelOrigin: { x: 85, y: 14 },
    location: { lat: 6.5419476, lng: 3.356072 }
  },
  {
    text: "Jenny's Shop",
    labelOrigin: { x: 70, y: 14 },
    location: { lat: 6.5419876, lng: 3.356172 }
  }
];

const Map = () => {
  console.log('smap did too many re-rendering cause by useUpdateEffect hook');
  const [loaded] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&v=3&language=en`);
  let google = window.google || null; // eslint-disable-line
  const [state, setState] = useState(false); // eslint-disable-line
  const { coordinates: [lng, lat] } = useLocationContext();

  const [showInfo, setShowInfo] = useState(false);

  useUpdateEffect(() => {
    const timeInterval = setInterval(() => {
      if (google && loaded && !state) {
        setState(true);
        clearInterval(timeInterval);
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [loaded, google]);

  if (!state) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  const mapJsx = (<GoogleMap
    mapContainerClassName="Map"
    zoom={16}
    center={{ lng, lat }}
    options={{ styles: mapStyles }}
  >
    {locations.map(loc =>
      (<Marker
        key={loc.text}
        position={loc.location}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        label={{
          text: loc.text,
          fontWeight: 'bold',
          fontSize: '12px',
        }}
        onClick={() => setShowInfo(!showInfo)}
      />)
    )}
  </GoogleMap>);


  return state && mapJsx;
};

export default Map;
