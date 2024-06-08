import cardsList from '@/app/data/cardsList'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState<any>();

  return (
    <div className="mt-10 ml-2">
      <h2 className="font-semibold text-black mb-3 mt-5">Payment Methods</h2>
      <div className="grid grid-cols-4 gap-3"> {/* Adjust grid-cols value as needed */}
        {cardsList.map((item, index) => (
          <div 
            key={index} 
            className={`flex justify-center border-[1px] rounded-md border-customDark p-2 transition duration-300 hover:border-customDark hover:bg-customDark
            ${index === selectedCard ? 'border-customDark bg-customDark' : null}`}
            onClick={() => setSelectedCard(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={70}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
