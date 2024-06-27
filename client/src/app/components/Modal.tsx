import React, { PropsWithChildren } from 'react';

interface IModalProps extends PropsWithChildren {
  closeModal: () => void;
}
export const Modal: React.FC<IModalProps> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="fixed inset-0 bg-gray-800 opacity-75" onClick={closeModal} />
      <div className=" flex flex-col bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full">
        {children}
      </div>
    </div>
  )
}