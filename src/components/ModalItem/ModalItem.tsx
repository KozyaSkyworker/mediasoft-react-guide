import { RootState } from '@store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
type TProps = {
  label: string;
  itemType: 'hate' | 'like' | 'idk';
};

export const ModalItem: React.FC<TProps> = ({ label, itemType }) => {
  const [isItemActive, setIsActiveActive] = useState(false);

  const myCountsRedux = useSelector((state: RootState) => state.counters);

  return (
    <div
      className={`item flex-1 bg-gray-800/50 hover:bg-gray-800/90  rounded 
        h-min
       overflow-hidden transition-all`}>
      <div
        className="item__header flex items-center p-2 justify-between cursor-pointer"
        onClick={() => setIsActiveActive(!isItemActive)}>
        <p className="border-b-2 border-white border-dashed ">{label}</p>
        <span className="font-medium">{myCountsRedux[itemType].length}</span>
      </div>
      {/* {isItemActive && <div className="item__content py-2">12312313</div>} */}
      <div className={`item__content p-2 ${isItemActive ? 'h-max' : 'h-0'}`}>
        <ol className="list-decimal px-2 pl-4 h-[350px] overflow-y-scroll">
          {myCountsRedux[itemType].map((item, indx) => (
            <li key={indx} className="my-2 ">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
