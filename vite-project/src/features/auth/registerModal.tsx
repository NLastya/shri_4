import React from 'react';

interface RegisterModalProps {
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default RegisterModal;
