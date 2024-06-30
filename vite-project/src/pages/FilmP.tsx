import React from 'react';
import { useRouter } from 'next/router';
import FilmDetail from '../../components/Film';

const FilmPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <FilmDetail filmId={id} />
  );
};

export default FilmPage;
