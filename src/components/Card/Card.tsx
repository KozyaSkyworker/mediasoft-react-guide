import { TCharacter } from '@type/common';
import * as React from 'react';

type TProps = {
  char: TCharacter;
  setCurCard: React.Dispatch<React.SetStateAction<TCharacter | null>>;
};

export const Card: React.FC<TProps> = React.memo(function Card({ char, setCurCard }) {
  console.log('card render');
  const handlerDragStart = (event: React.DragEvent<HTMLDivElement>, char: TCharacter) => {
    console.log('start card grab');
    setCurCard(char);
  };

  return (
    <div
      className={`card absolute transition-shadow cursor-grab top-0 left-0 bottom-0 right-0 text-white font-medium text-2xl rounded flex items-center justify-center`}
      style={{
        backgroundImage: `url("${char.image}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      key={char.id}
      onDragStart={(e) => {
        e.currentTarget.classList.add('shadow-violet-500', 'shadow-2xl');
        handlerDragStart(e, char);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove('shadow-violet-500', 'shadow-2xl');
      }}
      draggable={true}>
      <p className="bg-black p-1 rounded text-[14px] absolute top-2 left-2">{char.name}</p>
    </div>
  );
});
