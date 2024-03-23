import { Card } from '@components/Card';
import { Target } from '@components/Target';
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

        <Target
          label={'I Hate'}
          styles={'bottom-5 left-5 bg-red-600'}
          targetType={'hate'}
          characters={characters}
          setCharacters={setCharacters}
          curCard={curCard}
        />
        <Target
          label={'I Like'}
          styles={'bottom-5 right-5 bg-green-500'}
          targetType={'like'}
          characters={characters}
          setCharacters={setCharacters}
          curCard={curCard}
        />
        <Target
          label={'I.D.K.'}
          styles={'top-5 right-5 bg-yellow-500'}
          targetType={'idk'}
          characters={characters}
          setCharacters={setCharacters}
          curCard={curCard}
        />
      </div>
    </div>
  );
};

export default App;
