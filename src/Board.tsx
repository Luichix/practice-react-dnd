import React, { PropsWithChildren } from 'react';
import Knight from './components/pieces/Knight';
import Square from './components/square';
import { observe } from './Game';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from './constants';

const Board = () => {
  const { position, canMovePosition, changePosition } = observe();
  const knightPosition = position;

  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(
      renderSquare(i, knightPosition, canMovePosition, changePosition)
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: '800px',
          height: '800px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          backgroundColor: 'black',
          border: '8px solid black',
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
};

export default Board;

function renderSquare(
  i: number,
  [knightX, knightY]: [number, number],
  canMovePosition: (
    toX: number,
    toY: number,
    position: [number, number]
  ) => boolean,
  changePosition: (toX: number, toY: number) => void
) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  // const isKnightHere = x === knightX && y === knightY;
  // const black = (x + y) % 2 === 1;
  // const piece = isKnightHere ? <Knight /> : null;

  const handleSquareClick = (
    toX: number,
    toY: number,
    position: [number, number]
  ) => {
    console.log(`Cambiando la posicion [${toX},${toY}]`);
    if (canMovePosition(toX, toY, position)) {
      changePosition(toX, toY);
    }
  };

  return (
    <div
      key={i}
      style={{ width: '100%', height: '100px' }}
      onClick={() => handleSquareClick(x, y, [knightX, knightY])}
    >
      <BoardSquare
        x={x}
        y={y}
        position={[knightX, knightY]}
        canMovePosition={canMovePosition}
        changePosition={changePosition}
      >
        {renderPiece(x, y, [knightX, knightY])}
      </BoardSquare>
      {/* <Square black={black}>{piece}</Square> */}
    </div>
  );
}

interface BoardSquareProps extends PropsWithChildren {
  x: number;
  y: number;
  position: [number, number];
  canMovePosition: (
    toX: number,
    toY: number,
    position: [number, number]
  ) => boolean;
  changePosition: (toX: number, toY: number) => void;
}

const BoardSquare = ({
  x,
  y,
  position,
  canMovePosition,
  changePosition,
  children,
}: BoardSquareProps) => {
  const black = (x + y) % 2 === 1;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMovePosition(x, y, position),
      drop: () => changePosition(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y, position]
  );

  return (
    <div
      ref={drop}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
};

function renderPiece(
  x: number,
  y: number,
  [knightX, knightY]: [number, number]
) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

const Overlay = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
};
