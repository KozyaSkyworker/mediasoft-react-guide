import { TCard, TCharacter } from '@type/common';
import * as React from 'react';

type TProps = {
  char: TCharacter;
  setCurCard: React.Dispatch<React.SetStateAction<TCharacter | null>>;
};

export const Card: React.FC<TProps> = ({ char, setCurCard }) => {
  const handlerDragStart = (event: React.DragEvent<HTMLDivElement>, char: TCharacter) => {
    setCurCard(char);
  };

  return (
    <div
      className={`card absolute top-0 left-0 bottom-0 right-0 text-white font-medium text-2xl rounded flex items-center justify-center`}
      style={{
        backgroundImage: `url("${char.image}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
      key={char.id}
      onDragStart={(e) => {
        handlerDragStart(e, char);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e) => {
        console.log('drag end card');
      }}
      draggable={true}>
      <p className="bg-black p-1 rounded text-[14px] absolute top-2 left-2">{char.name}</p>
    </div>
  );
};
