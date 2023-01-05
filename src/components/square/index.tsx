import React, { Children, PropsWithChildren } from 'react';

interface SquareProps extends PropsWithChildren {
  black: boolean;
}

const Square = ({ black, children }: SquareProps) => {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';
  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
        fontSize: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </div>
  );
};

export default Square;
