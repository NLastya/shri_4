import React from 'react';
import style from './Loading.module.css'


const Loading = () => {
  return (
    <div className={style.loading}>
      <div className="loader-wrapper d-flex justify-content-center align-items-center"><div className={style.loader}><div className={style.ballspinfadeloader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>
      
    </div>
  );
};

export default Loading;
