'use client'

import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import style from './raiting.module.css';
import { useSelector } from 'react-redux';
import { useRateMovieMutation } from './RaitingAPI';
import { RootState } from '../../redux/store';

const StarRating = ({ movieId }) => {
  const [rateMovie, { isLoading: isRatingMovie }] = useRateMovieMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const debouncedRateMovie = useCallback(
    debounce(async (movieId, user_rate) => {
      if (isLoggedIn) {
        try {
          await rateMovie({ movieId, user_rate }).unwrap();
          localStorage.setItem(`rating_${movieId}`, user_rate.toString());
        } catch (error) {
          console.error('Error rating movie:', error);
        }
      }
    }, 1000), [isLoggedIn, rateMovie]
  );

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
    debouncedRateMovie(movieId, starNumber);
  };

  const handleStarHover = (starNumber: number) => {
    setHoveredRating(starNumber);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className={style.ratingContainer}>
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <span
          key={starNumber}
          className={`
            ${style.star} 
            ${starNumber <= (hoveredRating || rating) ? style.filled : ''}
          `}
          onClick={() => handleStarClick(starNumber)}
          onMouseEnter={() => handleStarHover(starNumber)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;