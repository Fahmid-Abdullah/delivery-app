"use client";
import { useState, useEffect } from 'react';
import Booking from '@/components/Booking/booking';
import Mapboxmap from '@/app/map/mapboxmap';
import { UserLocationContext } from '../context/UserLocationContext';
import { SourceCordiContext } from '../context/SourceCordiContext';
import { DestinationCordiContext } from '../context/DestinationCordiContext';
import { DirectionDataContext } from '../context/DirectionDataContext';
import { DeliveryTypeContext } from '../context/DeliveryTypeContext';
import { SelectedCarAmountContext } from '../context/SelectedCarAmountContext';

export default function Page() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>();
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>();
  const [directionCoordinates, setDirectionCoordinates] = useState<any>();
  const [selectedCar, setSelectedCar] = useState<any>();
  const [deliveryPrice, setDeliveryPrice] = useState<any>();

  useEffect(() => {
    getUserLocation();
  }, [])

  const getUserLocation=() => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setUserLocation( {
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }

  return (
    <div className="h-screen">  {/* Ensure this div takes up full height of the viewport */}
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
        <DestinationCordiContext.Provider value={ { destinationCoordinates, setDestinationCoordinates }}>
        <DirectionDataContext.Provider value={ {directionCoordinates, setDirectionCoordinates} }>
        <DeliveryTypeContext.Provider value={{ selectedCar, setSelectedCar }}>
        <SelectedCarAmountContext.Provider value={{ deliveryPrice, setDeliveryPrice }}>
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">  {/* Ensure grid takes up full height */}
        <div className="col-span-2 bg-customDark relative h-full">  {/* Ensure this div takes up full height */}
          <Mapboxmap />
        </div>
        <div className="bg-customRed h-full overflow-auto">  {/* Ensure this div takes up full height */}
          <Booking />
        </div>
      </div>
      </SelectedCarAmountContext.Provider>
      </DeliveryTypeContext.Provider>
      </DirectionDataContext.Provider>
      </DestinationCordiContext.Provider>
      </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
