import { TCard } from '@type/common';
import * as React from 'react';

type TProps = {
  card: TCard;
  setCurCard: React.Dispatch<React.SetStateAction<TCard | null>>;
};

export const Card: React.FC<TProps> = ({ card, setCurCard }) => {
  const handlerDragStart = (event: React.DragEvent<HTMLDivElement>, card: TCard) => {
    setCurCard(card);
  };

  return (
    <div
      className={`card absolute top-0 left-0 bottom-0 right-0 ${card.bg} text-white font-medium text-2xl rounded flex items-center justify-center`}
      key={card.id}
      onDragStart={(e) => {
        handlerDragStart(e, card);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e) => {
        console.log('drag end card');
      }}
      draggable={true}>
      {card.id}
    </div>
  );
};
