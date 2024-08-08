import '@pixi/events';

import { AnimatedSprite, Container, Sprite } from '@pixi/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import BoatImg from '@/app/_assets/sprites/boat/image.png';
import PlayerFishIdleData from '@/app/_assets/sprites/player-fish-idle/data.json';
import PlayerFishStartData from '@/app/_assets/sprites/player-fish-start/data.json';
import FishermanData from '@/app/_assets/sprites/player-row/data.json';
import { PlayerStatus, Turns } from '@/utils';

import { useGetSprite } from '../common/use-get-sprite';
import { useWindowSize } from '../use-window-size';

const maxLeftPosition = 0 + BoatImg.width;

export const useGetBoat = () => {
  const rowPressIntervalRef = useRef<NodeJS.Timeout>(null);
  const idleAnimationTimeoutRef = useRef<NodeJS.Timeout>(null);

  const { width, height } = useWindowSize();

  const [playerStatus, setPlayerStatus] = useState(PlayerStatus.Row);

  const [turn, setTurn] = useState(Turns.Right);
  const [boatX, setBoatX] = useState(maxLeftPosition);
  const [isPlayerRowing, setIsPlayerRowing] = useState(false);
  const { frames: playerRowFrames } = useGetSprite(
    '/assets/fisherman-row.png',
    FishermanData,
    300
  );
  const { frames: playerFishingStartFrames } = useGetSprite(
    '/assets/player-fish-start.png',
    PlayerFishStartData,
    300
  );
  const { frames: playerFishingIdleFrames } = useGetSprite(
    '/assets/player-fish-idle.png',
    PlayerFishIdleData,
    300
  );

  const player = useMemo(() => {
    switch (playerStatus) {
      case PlayerStatus.Row:
        return (
          !!playerRowFrames.length && (
            <AnimatedSprite
              anchor={1}
              scale={[turn, 1]}
              x={-36 + 36 * turn}
              y={4}
              textures={playerRowFrames}
              isPlaying={isPlayerRowing}
              {...(!isPlayerRowing && { currentFrame: 0 })}
            />
          )
        );
      case PlayerStatus.FishingStart:
        return (
          !!playerFishingStartFrames.length && (
            <AnimatedSprite
              anchor={1}
              scale={[turn, 1]}
              x={-36 + 36 * turn}
              y={4}
              key={playerStatus}
              textures={playerFishingStartFrames}
              isPlaying
            />
          )
        );
      case PlayerStatus.FishingIdle:
        return (
          !!playerFishingIdleFrames.length && (
            <AnimatedSprite
              anchor={1}
              scale={[turn, 1]}
              x={-36 + 36 * turn}
              y={4}
              textures={playerFishingIdleFrames}
              isPlaying
            />
          )
        );

      default:
        return null;
    }
  }, [
    playerStatus,
    playerRowFrames,
    turn,
    isPlayerRowing,
    playerFishingStartFrames,
    playerFishingIdleFrames,
  ]);

  const boat = useMemo(
    () => (
      <Container
        position={[boatX, height - 210]}
        interactive
        interactiveChildren
        pointerdown={() => {
          setPlayerStatus(PlayerStatus.FishingStart);
          if (idleAnimationTimeoutRef.current)
            clearTimeout(idleAnimationTimeoutRef.current);
          // @ts-ignore
          idleAnimationTimeoutRef.current = setTimeout(
            () => setPlayerStatus(PlayerStatus.FishingIdle),
            8 * 300
          );
        }}
      >
        <Sprite
          anchor={1}
          y={0}
          scale={[turn, 1]}
          x={-40 + 40 * turn}
          image={BoatImg.src}
        />
        {player}
      </Container>
    ),
    [boatX, height, player, turn]
  );

  const handleTouchStart = useCallback(
    (e: any) => {
      if (playerStatus !== PlayerStatus.Row) setPlayerStatus(PlayerStatus.Row);
      if (rowPressIntervalRef.current)
        clearInterval(rowPressIntervalRef.current);
      if (e.client.x && width) {
        const isLeft = e.client.x < Math.ceil(width / 2);

        // @ts-ignore
        rowPressIntervalRef.current = setInterval(() => {
          if (isLeft) {
            setTurn((prevTurn) => {
              if (prevTurn === Turns.Left) {
                setIsPlayerRowing(true);
                setBoatX((prev) =>
                  prev - 1 < maxLeftPosition ? prev : prev - 1
                );
                return prevTurn;
              }
              return Turns.Left;
            });
          } else {
            setTurn((prevTurn) => {
              if (prevTurn === Turns.Right) {
                setIsPlayerRowing(true);
                setBoatX((prevX) => (prevX + 1 > width ? prevX : prevX + 1));
                return prevTurn;
              }
              return Turns.Right;
            });
          }
        }, 100);
      } else {
        if (rowPressIntervalRef.current)
          clearInterval(rowPressIntervalRef.current);
        setIsPlayerRowing(false);
      }
    },
    [playerStatus, width]
  );

  const handleTouchEnd = useCallback(() => {
    if (rowPressIntervalRef.current) clearInterval(rowPressIntervalRef.current);
    if (idleAnimationTimeoutRef.current)
      clearTimeout(idleAnimationTimeoutRef.current);
    setIsPlayerRowing(false);
  }, []);

  useEffect(() => {
    const handlePressKeyDown = (e: KeyboardEvent) => {
      if (playerStatus !== PlayerStatus.Row) setPlayerStatus(PlayerStatus.Row);
      switch (e.key) {
        case 'ArrowRight': {
          setTurn((prevTurn) => {
            if (prevTurn === Turns.Right) {
              setIsPlayerRowing(true);
              setBoatX((prevX) => (prevX + 1 > width ? prevX : prevX + 1));
              return prevTurn;
            }
            return Turns.Right;
          });

          break;
        }
        case 'ArrowLeft': {
          setTurn((prevTurn) => {
            if (prevTurn === Turns.Left) {
              setIsPlayerRowing(true);
              setBoatX((prev) =>
                prev - 1 < maxLeftPosition ? prev : prev - 1
              );
              return prevTurn;
            }
            return Turns.Left;
          });

          break;
        }
        default:
          break;
      }
    };
    // const handleKeyUp = () => setIsPlayerRowing(false);

    document.addEventListener('keydown', handlePressKeyDown);
    document.addEventListener('keyup', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', handlePressKeyDown);
      document.removeEventListener('keyup', handleTouchEnd);
    };
  }, [handleTouchEnd, playerStatus, width]);

  return { boat, handleTouchStart, handleTouchEnd };
};
