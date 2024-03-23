import { incrementHate, incrementLike, incrementIDK } from '@store/counterSlice';
import { RootState } from '@store/store';
import { TCharacter } from '@type/common';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

enum targetTypeEnum {
  hate = 'hate',
  like = 'like',
  idk = 'idk',
}

type TProps = {
  label: string;
  styles: string;
  targetType: 'hate' | 'like' | 'idk';
  characters: TCharacter[];
  setCharacters: React.Dispatch<React.SetStateAction<TCharacter[]>>;
  curCard: TCharacter;
};

export const Target: React.FC<TProps> = ({
  label,
  styles,
  targetType,
  characters,
  setCharacters,
  curCard,
}) => {
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
      onDragEnd={(e) => {
        console.log('drag end');
      }}
      onDrop={(e) => {
        e.preventDefault();
        switch (label) {
          case 'I Hate':
            dispatch(incrementHate());
            break;
          case 'I Like':
            dispatch(incrementLike());
            break;
          case 'I.D.K.':
            dispatch(incrementIDK());
            break;
        }
        setCharacters(characters.filter((el) => el.id != curCard.id));
      }}>
      <p className="text-white font-medium">
        {label} <span className="font-bold">{myCountsRedux[targetType]}</span>
      </p>
    </div>
  );
};
