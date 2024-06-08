import React, { useContext, useEffect, useRef } from 'react';
import { Map, Marker } from 'react-map-gl';
import { UserLocationContext } from '../context/UserLocationContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './markers';
import { SourceCordiContext } from '../context/SourceCordiContext';
import { DestinationCordiContext } from '../context/DestinationCordiContext';
import { DirectionDataContext } from '../context/DirectionDataContext';
import Mapboxroute from './mapboxroute';
import Distancetime from './distancetime';

const session_token='8D8AC610-566D-4EF0-9C22-186B2A5ED793';
const MAPBOX_DRIVING_ENDPOINT = 'https://api.mapbox.com/directions/v5/mapbox/driving/';

export default function Mapboxmap() {
  const mapRef = useRef<any>();
  const { userLocation } = useContext(UserLocationContext);

  const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

  const {directionCoordinates, setDirectionCoordinates} = useContext(DirectionDataContext);

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center:[sourceCoordinates.lng, sourceCoordinates.lat],
        duration:2500
      })
    }

  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center:[destinationCoordinates.lng, destinationCoordinates.lat],
        duration:2500
      })

      if (sourceCoordinates) {
        getDirectionsRoute();
      }
    }

  }, [destinationCoordinates]);

  const getDirectionsRoute = async () => {
    const res = await fetch(MAPBOX_DRIVING_ENDPOINT + sourceCoordinates.lng + "," + sourceCoordinates.lat + ";" + 
      destinationCoordinates.lng + "," + destinationCoordinates.lat + "?annotations=maxspeed&overview=full&geometries=geojson&access_token=" + 
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN, {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    const result = await res.json();
    setDirectionCoordinates(result);
  }

  return (
    <div className="w-full h-full">
      {userLocation ? 
        <Map ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: userLocation?.lng,
            latitude: userLocation?.lat,
            zoom: 14
          }}
          style={{ width: '100%', height: '90%' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        > 
        <Markers />
        {directionCoordinates?.routes ? (
          <Mapboxroute 
            coordinates={directionCoordinates.routes[0]?.geometry.coordinates}
          />
        ):null}
        </Map>
      : null}
      <div>
        <div className='p-3'>
          <Distancetime/>
        </div>
      </div>
    </div>
  );
}
