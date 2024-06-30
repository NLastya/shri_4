import React from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';

interface ModalPortalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalPortalProps> = ({ children }) => {
    return createPortal(
        <div className={style.overlay}>
            <div className={style.content}>{children}</div>
        </div>,
        document.body
    );
}

export default Modal;
