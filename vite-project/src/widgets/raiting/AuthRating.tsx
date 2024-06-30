import React from 'react';
import StarRating from './Rainting';
import WithAuthCheck from '../../features/auth/authCheck/AuthCheck';

const AuthenticatedStarRating: React.FC = (props) => (
    <WithAuthCheck>
        <StarRating movieId = {props.id}/>
    </WithAuthCheck>
);

export default AuthenticatedStarRating;