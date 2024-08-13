'use client';

import { Stage } from '@pixi/react';

import { useWindowSize } from '@/hooks/use-window-size';

export default function Home() {
  const { width, height } = useWindowSize();

  return (
    <Stage
      width={width}
      height={height}
      // options={{ backgroundColor: 0xeef1f5 }}
      options={{ background: 'black' }}
    />
  );
}
