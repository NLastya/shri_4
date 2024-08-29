import React from 'react';
import FilmDetail from './Film';

const FilmPage = ({params}: {params: {id: string}}) => {

  console.log(params)
  return (
    <FilmDetail id ={params.id}
     />
  );
};

export default FilmPage;
