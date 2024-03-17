import { Card } from '@components/Card';
import { TCard, TCharacter } from '@type/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  // карточки для перетаскивания
  const [cards, setCards] = useState<TCard[]>([
    {
      id: 1,
      bg: 'bg-rose-500',
    },
    {
      id: 2,
      bg: 'bg-pink-500',
    },
    {
      id: 3,
      bg: 'bg-fuchsia-500',
    },
    {
      id: 4,
      bg: 'bg-purple-500',
    },
    {
      id: 5,
      bg: 'bg-indigo-500',
    },
    {
      id: 6,
      bg: 'bg-sky-500',
    },
    {
      id: 7,
      bg: 'bg-green-500',
    },
    {
      id: 8,
      bg: 'bg-orange-500',
    },
    {
      id: 9,
      bg: 'bg-cyan-500',
    },
  ]);

  // счёт карточек по категориям
  const [myCounts, setMyCounts] = useState({
    hate: 0,
    like: 0,
    idk: 0,
  });

  // текущая выбранная карточка для перетаскивания
  const [curCard, setCurCard] = useState<TCharacter | null>(null);

  const [characters, setCharacters] = useState<TCharacter[]>([]);

  const fetchAllCharactes = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character?page=2');
    console.log(response.data.results);
    setCharacters(response.data.results);
  };

  useEffect(() => {
    fetchAllCharactes();
  }, []);

  return (
    <div>
      <div className="wrapper bg-black w-screen h-screen flex items-center justify-center relative">
        <div className="cards w-[300px] h-[300px] bg-gray-900 rounded relative flex items-center justify-center">
          {/* {cards.map((card) => (
            <Card key={card.id} card={card} setCurCard={setCurCard} />
          ))} */}
          {characters.map((char) => (
            <Card key={char.id} char={char} setCurCard={setCurCard} />
          ))}
          <p className="text-white font-medium">Кажется, всё</p>
        </div>

        <div
          className="target absolute bottom-5 left-5 rounded bg-red-600 flex items-center justify-center w-32 h-32 "
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
            let newCount = myCounts.hate + 1;
            setMyCounts({ ...myCounts, hate: newCount });
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            I hate <span className="font-bold">{myCounts.hate}</span>
          </p>
        </div>
        <div
          className="target absolute bottom-5 right-5 rounded bg-green-500 flex items-center justify-center w-32 h-32 "
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnd={(e) => {
            console.log('drag end');
          }}
          onDrop={(e) => {
            e.preventDefault();
            let newCount = myCounts.like + 1;
            setMyCounts({ ...myCounts, like: newCount });
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            I like <span className="font-bold">{myCounts.like}</span>
          </p>
        </div>
        <div
          className="target absolute top-5 right-5 rounded bg-yellow-500 flex items-center justify-center w-32 h-32 "
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnd={(e) => {
            console.log('drag end');
          }}
          onDrop={(e) => {
            e.preventDefault();
            let newCount = myCounts.idk + 1;
            setMyCounts({ ...myCounts, idk: newCount });
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            IDK <span className="font-bold">{myCounts.idk}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
