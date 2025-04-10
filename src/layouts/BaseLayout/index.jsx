import React from 'react';
import { Leftbar } from '../../components/Leftbar';

export const BaseLayout = ({ children, className }) => {
  return (
    <div className="flex flex-row min-h-screen bg-mainBg">
      <div className="w-64 min-h-screen">
        <Leftbar isMobile={false} />
      </div>

      <div className={`flex-1 p-6 overflow-auto ${className}`}>
        <div className="max-w-7xl mx-auto space-y-5">
          {children}
        </div>
      </div>
    </div>
  );
};
