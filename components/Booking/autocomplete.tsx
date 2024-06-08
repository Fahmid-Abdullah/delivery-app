import { DestinationCordiContext } from '@/app/context/DestinationCordiContext';
import { SourceCordiContext } from '@/app/context/SourceCordiContext';
import React, { useContext, useEffect, useState } from 'react';

const session_token='8D8AC610-566D-4EF0-9C22-186B2A5ED793';
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';

export default function Autocomplete() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceAddressList, setSourceAddressList] = useState<any>(null); // Initialize with null
  const [destinationAddressList, setDestinationAddressList] = useState<any>(null); // Initialize with null

  const {sourceCoordinates, setSourceCoordinates} = useContext(SourceCordiContext);
  const {destinationCoordinates, setDestinationCoordinates} = useContext(DestinationCordiContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source) {
        getAddressList(source, setSourceAddressList);
      } else {
        setSourceAddressList(null); // Reset the list when source is empty
      }
    }, 300); // Add a delay of 300ms

    return () => clearTimeout(delayDebounceFn); // Cleanup function to clear timeout
  }, [source]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destination) {
        getAddressList(destination, setDestinationAddressList);
      } else {
        setDestinationAddressList(null); // Reset the list when destination is empty
      }
    }, 300); // Add a delay of 300ms

    return () => clearTimeout(delayDebounceFn); // Cleanup function to clear timeout
  }, [destination]);

  const getAddressList = async (query: string, setAddressList: (list: any) => void) => {
    try {
      const res = await fetch('/api/search-address?q=' + query, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await res.json();
      setAddressList(result.searchResults.suggestions); // Assuming the API response has a 'searchResults' field
    } catch (error) {
      console.error('Error fetching address list:', error);
      setAddressList([]); // Set empty array or handle error state
    }
  };

  const hasValidSourceAddressItems = Array.isArray(sourceAddressList) && sourceAddressList.some(item => item.full_address);
  const hasValidDestinationAddressItems = Array.isArray(destinationAddressList) && destinationAddressList.some(item => item.full_address);

  const onSourceAddressClick = async (item:any) => {
    setSource(item.full_address);
    setSourceAddressList([]);

    const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + 
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

    const result = await res.json();
    setSourceCoordinates( {
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1]
    })
  }

  const onDestinationAddressClick = async (item:any) => {
    setDestination(item.full_address);
    setDestinationAddressList([]);

    const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + 
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

    const result = await res.json();
    setDestinationCoordinates( {
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1]
    })
  }

  return (
    <div>
      <div className='mt-1 relative z-30'>
        <label className='font-semibold text-black'>Where From?</label>
        <input
          type='text'
          className='bg-white hover:bg-customLight focus:bg-customLight mt-2 text-black p-1 border-[1px] w-full rounded-md outline-none focus:border-green-300'
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        {hasValidSourceAddressItems && (
          <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
            {sourceAddressList.map((item: any, index: number) => (
              item.full_address && (
                <h2 key={index} className='p-3 text-black hover:bg-gray-100 cursor-pointer' 
                onClick={() => {
                  onSourceAddressClick(item);
                  setSource(item.full_address);
                  setSourceAddressList([]); // Clear the list after selection
                }}>{item.full_address}</h2>
              )
            ))}
          </div>
        )}
      </div>
      <div className='mt-2 relative z-20'>
        <label className='font-semibold text-black'>Where To?</label>
        <input
          type='text'
          className='bg-white hover:bg-customLight focus:bg-customLight p-1 mt-2 text-black border-[1px] w-full rounded-md outline-none focus:border-green-300'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {hasValidDestinationAddressItems && (
          <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
            {destinationAddressList.map((item: any, index: number) => (
              item.full_address && (
                <h2 key={index} className='p-3 text-black hover:bg-gray-100 cursor-pointer' 
                onClick={() => {
                  onDestinationAddressClick(item);
                  setDestination(item.full_address);
                  setDestinationAddressList([]); // Clear the list after selection
                }}>{item.full_address}</h2>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
