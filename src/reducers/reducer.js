import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const MovieList = (state = {}, action) => {
  console.log('Reducer MovieList action.type: ', action.type);
  switch (action.type) {
    case 'API_REQUEST':
    case 'GET_NOW_PLAYING_API_URL_REQUEST':{
      console.log('GET_NOW_PLAYING_API_URL_REQUEST state: ', state);
      console.log('GET_NOW_PLAYING_API_URL_REQUEST action.response: ', action.response);

      return merge({}, state, action.response)
    }
      
    default:
      return state;
  }
}

const GenreList = (state = {}, action) => {
  console.log('Reducer GenreList action.type: ', action.type);
  switch (action.type) {
    case 'API_REQUEST':
    case 'GENRE_API_REQUEST':
      console.log('GENRE_API_REQUEST state: ', state);
      console.log('GENRE_API_REQUEST action.response: ', action.response);

      return merge({}, state, action.response)
      
    default:
      return state;
  }
}
const GenreSelectMovieList = (state = {}, action) => {
  console.log('Reducer GenreSelectMovieList action.type: ', action.type);
  switch (action.type) {
    case 'GENRE_SELECT':{
      console.log('GENRE_SELECT: ', action.response);
    return (action.response)
    }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  MovieList,
  GenreList,
  GenreSelectMovieList
})

export default rootReducer