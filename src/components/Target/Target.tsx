import { removeCharacter } from '@store/charactersSlice';
import { addNewHate, addNewLike, addNewIDK } from '@store/counterSlice';
import { RootState } from '@store/store';
import { TCharacter } from '@type/common';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type TProps = {
  label: string;
  styles: string;
  targetType: 'hate' | 'like' | 'idk';
  curCard: TCharacter;
};

export const Target: React.FC<TProps> = ({ label, styles, targetType, curCard }) => {
  console.log('target render');
  const myCountsRedux = useSelector((state: RootState) => state.counters);
  const dispatch = useDispatch();

  return (
    <div
      className={`target absolute ${styles} rounded flex items-center justify-center w-32 h-32`}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnd={(e) => {}}
      onDrop={(e) => {
        e.preventDefault();

        // Это можно, наверное, как-то перписать поумнее

        switch (label) {
          case 'I Hate':
            dispatch(addNewHate(curCard.name));
            break;
          case 'I Like':
            dispatch(addNewLike(curCard.name));
            break;
          case 'I.D.K.':
            dispatch(addNewIDK(curCard.name));
            break;
        }
        dispatch(removeCharacter(curCard.id));
      }}>
      <p className="text-white font-medium">
        {label} <span className="font-bold">{myCountsRedux[targetType].length}</span>
      </p>
    </div>
  );
};
