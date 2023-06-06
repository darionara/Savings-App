import React from 'react';
import { Modal } from '../molecules/Modal';

export const AddNewBudgetRecord = ({ onClose, open, onSubmit }) => {
  return (
    <Modal description={'Zdefiniuj budżet'} 
           onClose={onClose} 
           open={open} 
           onSubmit={onSubmit} />
  );
};