import { ModalItem } from '@components/ModalItem';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import React, { useRef } from 'react';

type TProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<TProps> = ({ isModalOpen, setIsModalOpen }) => {
  const counters = useSelector((state: RootState) => state.counters);

  const modalContentRef = useRef(null);

  const handleClick = (event: { composedPath: () => string | any[] }) => {
    if (!event.composedPath().includes(modalContentRef.current)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="modal fixed left-0 right-0 top-0 bottom-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={() => handleClick(event)}>
      <div
        className="modal__inner w-[90%] h-[85%] bg-gray-700 rounded text-white p-5"
        ref={modalContentRef}>
        <div className="modal__header text-2xl font-bold">Бессмысленные результаты</div>
        <div className="modal__content my-5">
          <p>
            Вы наперетаскивали {counters.hate.length + counters.like.length + counters.idk.length}{' '}
            карточек. Из них в секции...
          </p>
          <div className="items mt-4 flex gap-3">
            <ModalItem label={'Hate'} itemType={'hate'} />
            <ModalItem label={'Like'} itemType={'like'} />
            <ModalItem label={'I.D.K.'} itemType={'idk'} />
          </div>
        </div>
        <div className="modal__footer">
          <p>
            Затраченное время: <span>?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
