'use client';

import { AnimatedSprite, Stage } from '@pixi/react';
import { BaseTexture, Spritesheet } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';

import CloudData from '@/app/_assets/sprites/fishing/cloud.json';
import CloudImg from '@/app/_assets/sprites/fishing/cloud.png';
import { useWindowSize } from '@/hooks/use-window-size';

export default function Home() {
  const { width, height } = useWindowSize();
  const [frames, setFrames] = useState<any[]>([]);
  const loadSpritesheet = useCallback(async () => {
    const baseTexture = BaseTexture.from(CloudImg.src);
    const spritesheet = new Spritesheet(baseTexture, CloudData);

    const parsed = await spritesheet.parse();
    setFrames(Object.values(parsed).map((texture) => ({ texture, time: 250 })));
  }, []);

  useEffect(() => {
    loadSpritesheet();
  }, [loadSpritesheet]);

  return (
    <>
      <Stage
        width={width}
        height={height}
        // options={{ backgroundColor: 0xeef1f5 }}
        options={{ background: 'black' }}
      >
        {!!frames.length && (
          <AnimatedSprite
            anchor={0.5}
            x={height / 2}
            y={width / 2}
            scale={3}
            textures={frames}
            isPlaying
            initialFrame={0}
          />
        )}
      </Stage>
    </>
  );
}
