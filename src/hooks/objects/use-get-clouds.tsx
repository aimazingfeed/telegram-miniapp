import { Container, Sprite } from '@pixi/react';
import { useMemo } from 'react';

import { useWindowSize } from '../use-window-size';

export const useGetClouds = () => {
  const { width, height } = useWindowSize();

  const clouds = useMemo(
    () =>
      new Array(Math.ceil(width / 576)).fill('').map((_, idx) => (
        <Container key={idx} anchor={1} x={576 * (idx + 1)} y={height - 215}>
          <Sprite
            x={-110}
            y={-50}
            anchor={1}
            image="/assets/one-mountain.png"
          />
          <Sprite anchor={1} image="/assets/cloud-blue.png" />
          <Sprite anchor={1} image="/assets/cloud-white.png" />
        </Container>
      )),
    [height, width]
  );

  return { clouds };
};
