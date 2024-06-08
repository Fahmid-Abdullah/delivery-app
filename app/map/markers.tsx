import { useContext } from 'react';
import { Marker } from 'react-map-gl';
import { UserLocationContext } from '../context/UserLocationContext';
import { SourceCordiContext } from '../context/SourceCordiContext';
import { DestinationCordiContext } from '../context/DestinationCordiContext';

export default function Markers() {
    const { userLocation } = useContext(UserLocationContext);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

    const defaultLocation = { lng: -122.4, lat: 37.8 };
    const currentUserLocation = userLocation || defaultLocation;

    return (
        <div>
            {/* Source Marker */}
            {sourceCoordinates == null ? (
                <Marker longitude={currentUserLocation.lng} latitude={currentUserLocation.lat} anchor="bottom">
                    <img className="w-10" src="./pin1.png" />
                </Marker>
            ) : (
                <Marker longitude={sourceCoordinates.lng} latitude={sourceCoordinates.lat} anchor="bottom">
                    <img className="w-10" src="./pin1.png" />
                </Marker>
            )}

            {/* Destination Marker */}
            {destinationCoordinates != null && (
                <Marker longitude={destinationCoordinates.lng} latitude={destinationCoordinates.lat} anchor="bottom">
                    <img className="w-10" src="./pin2.png" />
                </Marker>
            )}
        </div>
    );
}
