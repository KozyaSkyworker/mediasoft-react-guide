import { Card } from '@components/Card';
import Modal from '@components/Modal/Modal';
import { Target } from '@components/Target';
import { setCharacters } from '@store/charactersSlice';
import { RootState } from '@store/store';
import { TCharacter } from '@type/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  console.log(' app render');

  const chars = useSelector((state: RootState) => state.characters);

  const dispatch = useDispatch();

  const [isFetchinData, setIsFetchingData] = useState(true);

  const [nextPage, setNextPage] = useState<number | null>(42);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // текущая выбранная карточка для перетаскивания
  const [curCard, setCurCard] = useState<TCharacter | null>(null);

  const fetchAllCharactes = async (page: number) => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/character?page=${page}`);
      dispatch(setCharacters(response.data.results));
      nextPage < response.data.info.pages ? setNextPage((prev) => prev + 1) : setNextPage(null);
    } catch (error) {
      alert(error);
    }
    setIsFetchingData(false);
  };

  useEffect(() => {
    fetchAllCharactes(nextPage);
  }, []);

  useEffect(() => {
    if (chars.length < 6 && !isFetchinData && nextPage) {
      setIsFetchingData(true);
      fetchAllCharactes(nextPage);
    }
  }, [chars.length]);

  return (
    <div>
      <div className="wrapper bg-black w-screen h-screen flex items-center justify-center relative">
        {isModalOpen && <Modal isModalOpen setIsModalOpen={setIsModalOpen} />}
        <div className="cards w-[300px] h-[300px] bg-gray-900 rounded relative flex items-center justify-center">
          {chars.map((char) => (
            <Card key={char.id} char={char} setCurCard={setCurCard} />
          ))}
          <div className="box">
            <p className="block text-white text-center font-medium">Кажется, всё</p>
            <button
              className="block mt-2 bg-black text-white rounded hover:bg-gray-800 p-2"
              onClick={() => setIsModalOpen(true)}>
              Смотреть результаты
            </button>
          </div>
        </div>

        <Target
          label={'I Hate'}
          styles={'bottom-5 left-5 bg-red-600'}
          targetType={'hate'}
          curCard={curCard}
        />
        <Target
          label={'I Like'}
          styles={'bottom-5 right-5 bg-green-500'}
          targetType={'like'}
          curCard={curCard}
        />
        <Target
          label={'I.D.K.'}
          styles={'top-5 right-5 bg-yellow-500'}
          targetType={'idk'}
          curCard={curCard}
        />
      </div>
    </div>
  );
};

export default App;
