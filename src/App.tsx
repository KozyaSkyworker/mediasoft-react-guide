import { Card } from '@components/Card';
import { TCharacter } from '@type/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  console.log('render');

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
    const response = await axios.get('https://rickandmortyapi.com/api/character?page=42');
    console.log(response.data);
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
          <p className="block text-white font-medium">Кажется, всё</p>
          <button className="block bg-black text-white rounded hover:bg-gray-800 p-2">
            Смотреть результаты
          </button>
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
