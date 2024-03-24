import { Card } from '@components/Card';
import Modal from '@components/Modal/Modal';
import { Target } from '@components/Target';
import { setCharacters } from '@store/charactersSlice';
import { RootState } from '@store/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const chars = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();

  const [isFetchinData, setIsFetchingData] = useState(true);

  const [nextPage, setNextPage] = useState<number | null>(41);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // текущая выбранная карточка для перетаскивания
  // const [curCard, setCurCard] = useState<TCharacter | null>(null);

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
      toast.info('Подгрузилось ещё немного карточек!', {
        position: 'bottom-center',
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      fetchAllCharactes(nextPage);
    }
  }, [chars.length]);

  return (
    <div>
      <div className="wrapper bg-black w-screen h-screen flex items-center justify-center relative">
        {isModalOpen && <Modal isModalOpen setIsModalOpen={setIsModalOpen} />}
        <div className="cards w-[300px] h-[300px] bg-gray-900 rounded relative flex items-center justify-center">
          {chars.map((char) => (
            <Card key={char.id} char={char} />
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

        <div className="absolute top-5 left-5 bg-gray-800 text-white p-2 rounded">
          Осталось карточек: {chars.length}
        </div>
        <Target label={'I.D.K.'} styles={'top-5 right-5 bg-yellow-500'} targetType={'idk'} />
        <Target label={'I Hate'} styles={'bottom-5 left-5 bg-red-600'} targetType={'hate'} />
        <ToastContainer
          position="bottom-center"
          autoClose={1700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <Target label={'I Like'} styles={'bottom-5 right-5 bg-green-500'} targetType={'like'} />
      </div>
    </div>
  );
};

export default App;
