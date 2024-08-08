import type { ImageSource } from 'pixi.js';
import { BaseTexture, Spritesheet } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';

export const useGetSprite = (
  image: string | ImageSource | string[],
  data: any,
  time = 250
) => {
  const [frames, setFrames] = useState<any[]>([]);

  const loadSpritesheet = useCallback(async () => {
    const baseTexture = BaseTexture.from(image);
    const spritesheet = new Spritesheet(baseTexture, data);

    const parsed = await spritesheet.parse();
    setFrames(Object.values(parsed).map((texture) => ({ texture, time })));
  }, [data, image, time]);

  useEffect(() => {
    loadSpritesheet();
  }, [loadSpritesheet]);

  return { frames };
};
