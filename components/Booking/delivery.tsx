import { useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import deliveryType from '@/app/data/deliveryType'; // Make sure deliveryType is correctly imported
import { DirectionDataContext } from '@/app/context/DirectionDataContext';
import { PackageSizeContext } from '@/app/context/PackageSizeContext';
import { DeliveryTypeContext } from '@/app/context/DeliveryTypeContext';
import { SelectedCarAmountContext } from '@/app/context/SelectedCarAmountContext';

export default function Delivery() {
  const { selectedCar, setSelectedCar } = useContext(DeliveryTypeContext);
  const { directionCoordinates, setDirectionCoordinates } = useContext(DirectionDataContext);
  const { currSize, setCurrSize } = useContext(PackageSizeContext);
  const { deliveryPrice, setDeliveryPrice } = useContext(SelectedCarAmountContext);

  const getCost = (charges:any) => {
    return (charges * directionCoordinates.routes[0].distance * 0.000621371192 + parseFloat(currSize) * 20).toFixed(2);
  }

  return (
    <div className='mt-10 ml-2'>
      <h2 className='font-semibold text-black mb-3'>Delivery Type</h2>
      <div className='flex flex-col w-full'>
        {deliveryType.map((item, index) => (
          <div key={index} className={`flex border-customDark border-[1px] transition duration-300 hover:border-customDark hover:bg-customDark items-center m-1 p-2 rounded-md 
          ${index === selectedCar ? 'border-customDark bg-customDark border-[2px]' : null}`} onClick={() => {
            setSelectedCar(index);
            setDeliveryPrice(getCost(item.charges));
          }}>
            <Image className='ml-5' src={item.image} alt={item.name} width={70} height={70} />
            <div className="flex-grow pl-4 flex justify-between">
              <h2 className={`text-black ${index === selectedCar ? 'transition duration-300 text-customLight' : ''}`}>{item.name} Shipping</h2>
              {directionCoordinates && (
                <div className="text-right">
                  <span className={`text-black font-bold pr-5 ${index === selectedCar ? 'text-customLight' : null}`}>${getCost(item.charges)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
