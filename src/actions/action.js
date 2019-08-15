import { CALL_API } from '../middleware/movie-listing-api';
import {GET_NOW_PLAYING_API_URL_REQUEST, GENRE_API_REQUEST,
            API_REQUEST, API_ERROR, GENRE_SELECT, RATING_SELECT} from '../constants/constant';

const apiCall = (type, value) => ({
    [CALL_API]: {
      types: [API_REQUEST, type, API_ERROR],
      value
    }
})
export const getNowPlayingAPICall = (value) => (dispatch) => {
    console.log('Action getNowPlayingAPICall');
    return dispatch(apiCall(GET_NOW_PLAYING_API_URL_REQUEST, value))
}

export const getGenreAPICall = (value) => (dispatch) => {
    console.log('Action getGenreAPICall');
    return dispatch(apiCall(GENRE_API_REQUEST, value))
}

export const getSelectedGenre = (value, requiredValue) => (dispatch) => {
    console.log('Action getSelectedGenre');
    return dispatch({type: GENRE_SELECT , response:{value, requiredValue}});
}
export const getSelectedRating = (value,) => (dispatch) => {
    console.log('Action getSelectedRating');
    return dispatch({type: RATING_SELECT , value});
}