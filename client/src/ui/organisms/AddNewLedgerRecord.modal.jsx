import React from 'react';
import { Modal } from '../molecules/Modal';

export const AddNewLedgerRecord = ({ type, onClose, open, onSubmit }) => {
  const descriptions = {
    INCOME: 'Dodaj wpływ',
    EXPENSE: 'Dodaj wydatek'
  }

  return (
    <Modal description={descriptions[type]} 
           onClose={onClose} 
           onSubmit={onSubmit}
           open={open} />
  );
};
