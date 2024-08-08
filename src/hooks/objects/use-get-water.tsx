import '@pixi/events';

import { Container, Sprite } from '@pixi/react';
import { useMemo } from 'react';

import { useWindowSize } from '../use-window-size';

export const useGetWater = (
  touchstart: (e: TouchEvent) => void,
  touchend: () => void
) => {
  const { width, height } = useWindowSize();

  const water = useMemo(
    () => (
      <Container
        anchor={1}
        x={0}
        y={height - 215}
        interactive
        interactiveChildren
        touchstart={touchstart}
        touchend={touchend}
        touchcancel={touchend}
      >
        {new Array(Math.ceil(width / 384)).fill('').map((_, idx) => (
          <Sprite image="/assets/sea.png" x={384 * idx} key={idx} />
        ))}
      </Container>
    ),
    [height, touchend, touchstart, width]
  );

  return { water };
};
