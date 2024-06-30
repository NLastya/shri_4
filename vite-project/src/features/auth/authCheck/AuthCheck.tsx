import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import style from './authCheck.module.css'; 

type WithAuthCheckProps = {
    children: React.ReactNode;
};

const WithAuthCheck: React.FC<WithAuthCheckProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isAuthenticated) {
        return (
            <div className={style.authcheckblock}>
                {children}
                {/* <div className={style.authcheckmessage}>Вы должны быть залогинены, чтобы выполнить это действие.</div> */}
            </div>
        );
    }

    return <>{children}</>;
};

export default WithAuthCheck;
