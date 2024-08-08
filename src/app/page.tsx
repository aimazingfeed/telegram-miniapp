'use client';

import { Stage } from '@pixi/react';

import { useGetBoat } from '@/hooks/objects/use-get-boat';
import { useGetClouds } from '@/hooks/objects/use-get-clouds';
import { useGetWater } from '@/hooks/objects/use-get-water';
import { useWindowSize } from '@/hooks/use-window-size';

export default function Home() {
  const { width, height } = useWindowSize();
  const { boat, handleTouchStart, handleTouchEnd } = useGetBoat();
  const { water } = useGetWater(handleTouchStart, handleTouchEnd);
  const { clouds } = useGetClouds();

  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: '#62abd4' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {clouds}
      {boat}
      {water}
    </Stage>
  );
}
