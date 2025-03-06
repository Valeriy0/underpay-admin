import React from 'react';
import { Leftbar } from '../../components/Leftbar';

export const BaseLayout = ({ children, className }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`relative bg-mainBg flex items-center justify-center w-screen h-screen w-screen`}>
        <Leftbar />
        <div className={`p-[1rem] max-w-[1200px] flex flex-col items-center justify-start h-full w-full overflow-hidden overflow-y-auto invisible-scrollbar ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
