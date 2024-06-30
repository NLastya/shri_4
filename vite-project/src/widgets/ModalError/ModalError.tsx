import React, { FC } from 'react';
import styles from './modalError.module.css';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    // <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ошибка</h2>
        <p>{message}</p>
        <button className={styles.btnClose} onClick={onClose}>Закрыть</button>
      </div>
    // </div>
  );
};

export default ErrorModal;