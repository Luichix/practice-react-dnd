import { useEffect, useState } from 'react';

export function observe() {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const randPos = () => Math.floor(Math.random() * 8);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition([randPos(), randPos()]);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const changePosition = (toX: number, toY: number) => {
    setPosition([toX, toY]);
  };

  const canMovePosition = (
    toX: number,
    toY: number,
    position: [number, number]
  ) => {
    let [x, y] = position;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  };
  return {
    position,
    changePosition,
    canMovePosition,
  };
}
