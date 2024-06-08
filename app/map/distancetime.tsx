import React, { useContext } from 'react';
import { DirectionDataContext } from '../context/DirectionDataContext';
import { DeliveryTypeContext } from '../context/DeliveryTypeContext';

export default function Distancetime() {
  const { directionCoordinates } = useContext(DirectionDataContext);
  const { selectedCar, setSelectedCar } = useContext(DeliveryTypeContext);

  const calculateDeliveryDate = () => {
    console.log(selectedCar);
    if (!directionCoordinates || !directionCoordinates.routes[0]) return null;

    const distanceInKm = directionCoordinates.routes[0].distance * 0.000621371192;
    let deliveryDays;

    switch (selectedCar) {
      case 0: // Free Shipping
        deliveryDays = Math.ceil(distanceInKm / 5); // Assuming 10 km per day for free shipping
        console.log(deliveryDays);
        break;
      case 1: // Fast Shipping
        deliveryDays = Math.ceil(distanceInKm / 15); // Assuming 15 km per day for fast shipping
        console.log(deliveryDays);
        break;
      case 2: // Same-day Shipping
        console.log("same day");
        return new Date().toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      default:
        return null;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    console.log(deliveryDate.getDate);
    return deliveryDate.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return directionCoordinates?.routes && (
    <div>
      <h2>
        Distance: <span className='font-bold mr-3 text-customLight'>{(directionCoordinates.routes[0].distance * 0.000621371192 * 1.60934).toFixed(2)} Km</span>
        Estimated Delivery: {selectedCar != null ? (
        <span className='font-bold text-customLight'>{calculateDeliveryDate()}</span>
        ) : (
        <span className='text-red-500'>Please select a delivery type</span>
        )}
      </h2>
    </div>
  );
}
