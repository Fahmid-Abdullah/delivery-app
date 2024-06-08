import React, { useContext, useState } from 'react'
import Autocomplete from './autocomplete'
import PackageSize from './packagesize';
import Delivery from './delivery';
import Cards from './cards';
import { PackageSizeContext } from '@/app/context/PackageSizeContext';
import { useRouter } from 'next/navigation';
import { SelectedCarAmountContext } from '@/app/context/SelectedCarAmountContext';

export default function booking() {
    const screenHeight=window.innerHeight * 0.72;
    const [currSize, setCurrSize] = useState<any>(1.5);
    const [amount, setAmount] = useState();
    const {deliveryPrice, setDeliveryPrice} = useContext(SelectedCarAmountContext);
    const router:any = useRouter();

    const handleBooking = () => {
      if (deliveryPrice) {
          router.push(`/payment?deliveryPrice=${deliveryPrice}`);
      }
    };

  return (
    <div className='mt-5 px-5 pb-0'>
        <PackageSizeContext.Provider value={{ currSize, setCurrSize }}>
        <h2 className='text-[20px] text-black font-bold '>Booking</h2>
        <div className='p-5' style={{height:screenHeight}}>
        <Autocomplete/>
        <PackageSize/>
        <Delivery/>
        <Cards />
        <button onClick={handleBooking} className={`w-full bg-customDark transition duration-300 hover:bg-black p-5 rounded-md mt-10
         ${!deliveryPrice ? 'bg-gray-300':null}`} disabled={!deliveryPrice}>Book</button>
        </div>
        </PackageSizeContext.Provider>
    </div>
  )
}
