import { useState } from 'react';
import style from './modal.module.css';

interface LoginModalProps {
    onClose: () => void;
    login: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, login }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        login(username, password);
    };

    return (
        <div className={style.modal}>
            <h2>Авторизация</h2>
            <label htmlFor="username">Логин<span className={style.redComment}>*</span></label>
            <input
                type="text"
                id="username"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Пароль<span className={style.redComment}>*</span></label>
            <input
                type="password"
                id="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className={style.btns}>
                <button className={style.btnLog} onClick={handleLogin}>Войти</button>
                <button className={style.btnExit} onClick={onClose}>Отменить</button>
            </div>
        </div>
    );
};

export default LoginModal;