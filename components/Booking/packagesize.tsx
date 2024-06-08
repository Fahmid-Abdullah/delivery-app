import React, { useContext, useEffect, useState } from 'react';
import { Slider } from "@nextui-org/slider";
import { PackageSizeContext } from '@/app/context/PackageSizeContext';

export default function PackageSize() {
  const {currSize, setCurrSize} = useContext(PackageSizeContext);

  return (
    <div className='mt-8 ml-2 z-10'>
      <label className='font-semibold text-black' htmlFor="package-size">Package Size</label>
      <Slider
        id="package-size"
        className="text-black max-w-md ml-8 p-3"
        size="md"
        color="foreground"
        step={0.5}
        showSteps={true}
        hideValue={true}
        maxValue={2}
        minValue={1}
        defaultValue={1.5}
        marks={[
          { value: 1, label: 'Small' },
          { value: 1.5, label: 'Medium' },
          { value: 2, label: 'Large' }
        ]}
        onChange={(value) => setCurrSize(value)}
        aria-label="Package Size"
      />
    </div>
  );
}
