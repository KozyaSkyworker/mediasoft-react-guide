import { Card } from '@components/Card';
import { incrementHate, incrementIDK, incrementLike } from '@store/counterSlice';
import { RootState } from '@store/store';
import { TCharacter } from '@type/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  console.log('render');

  const myCountsRedux = useSelector((state: RootState) => state.counters);
  const dispatch = useDispatch();

  // счёт карточек по категориям
  const [myCounts, setMyCounts] = useState({
    hate: 0,
    like: 0,
    idk: 0,
  });

  const [isFetchinData, setIsFetchingData] = useState(true);

  const [nextPage, setNextPage] = useState<number | null>(1);

  // текущая выбранная карточка для перетаскивания
  const [curCard, setCurCard] = useState<TCharacter | null>(null);

  // персонажи
  const [characters, setCharacters] = useState<TCharacter[]>([]);

  const fetchAllCharactes = async (page: number) => {
    const response = await axios.get(`${process.env.API_BASE_URL}/character?page=${page}`);

    // console.log(response.data.info);

    setCharacters([...response.data.results, ...characters]);

    nextPage < response.data.info.pages ? setNextPage((prev) => prev + 1) : setNextPage(null);

    setIsFetchingData(false);
  };

  useEffect(() => {
    fetchAllCharactes(nextPage);
  }, []);

  useEffect(() => {
    console.log(characters.length, isFetchinData, nextPage);

    if (characters.length < 6 && !isFetchinData && nextPage) {
      setIsFetchingData(true);
      fetchAllCharactes(nextPage);
      console.log('fetching new');
    }
  }, [characters.length]);

  return (
    <div>
      <div className="wrapper bg-black w-screen h-screen flex items-center justify-center relative">
        <div className="cards w-[300px] h-[300px] bg-gray-900 rounded relative flex items-center justify-center">
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
            dispatch(incrementHate());
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            I hate <span className="font-bold">{myCountsRedux.hate}</span>
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
            dispatch(incrementLike());
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            I like <span className="font-bold">{myCountsRedux.like}</span>
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
            dispatch(incrementIDK());
            setCharacters(characters.filter((el) => el.id != curCard.id));
            console.log('drop');
          }}>
          <p className="text-white font-medium">
            I.D.K. <span className="font-bold">{myCountsRedux.idk}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
