'use client'

import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../features/auth/authSlice';
import style from './header.module.css';
import Modal from '../../features/modal/Modal.tsx';
import LoginModal from '../../features/auth/signinModal';
import ErrorModal from '../ModalError/ModalError.tsx'; // Новый компонент для отображения ошибок
import { RootState } from '../../redux/store';
import { saveTokenToLocalStorage, removeTokenFromLocalStorage } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authAPI';

const Header: FunctionComponent = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [loginUser, { error: loginError, isLoading: isLogingUser }] = useLoginMutation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch]);

    useEffect(() => {
        if (loginError) {
            console.error('Login error:', loginError);
            setErrorMessage('Произошла ошибка при входе. Пожалуйста, попробуйте позже.');
            setShowErrorModal(true);
        }
    }, [loginError]);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await loginUser({ username, password }).unwrap();
            console.log("response: ", response);
            if (response.token) {
                console.log("token: ", response.token);
                dispatch(login(response.token));
                setShowLoginModal(false);
                dispatch(saveTokenToLocalStorage(response.token) as any);
            } else {
                console.log("Login unsuccessful, no token found in response");
                setErrorMessage('Не удалось выполнить вход. Проверьте учетные данные и повторите попытку.');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Произошла ошибка при входе. Пожалуйста, попробуйте позже.');
            setShowErrorModal(true);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(removeTokenFromLocalStorage());
    };

    return (
        <header className={style.header}>
            <h1>Билетопоиск</h1>
            {isLoggedIn ? (
                <div className={style.fl}>
                    <button className={style.btnExit} onClick={handleLogout}>Logout</button>
                    <img src="/profile.svg" alt="User" />
                </div>
            ) : (
                <>
                    <button className={style.btnLog} onClick={() => setShowLoginModal(true)}>Login</button>
                </>
            )}
            {showLoginModal && (
                <Modal>
                    <LoginModal onClose={() => setShowLoginModal(false)} login={handleLogin} />
                </Modal>
            )}
            {showErrorModal && (
                <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />
            )}
        </header>
    );
};

export default Header;