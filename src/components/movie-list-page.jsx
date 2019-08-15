import React, { Component } from 'react';
import { getNowPlayingAPICall, getGenreAPICall, getSelectedGenre } from '../actions/action'
import {GET_NOW_PLAYING_API_URL, GENRE_API_URL} from '../constants/constant'
import { connect } from 'react-redux'
import Moviecard from './movie-card.jsx'

class MovieListPage extends Component {
  constructor(props) {
    super(props);

    this.filtered = [];
    this.checked  =[];
  }
  componentDidMount() {
    console.log('Component MovieListPage componentDidMount');
    this.props.dispatch(getNowPlayingAPICall(GET_NOW_PLAYING_API_URL));
    this.props.dispatch(getGenreAPICall(GENRE_API_URL));
  }
  filterMoviesOnGenre = (e) => {
    if(e.currentTarget.checked) {
      this.checked.push(e.currentTarget.value);
    }else if(!e.currentTarget.checked){
      this.checked.splice(this.checked.indexOf(e.currentTarget.value), 1);
    }
    this.filterLogic();
    this.props.dispatch(getSelectedGenre([...new Set(this.filtered)], this.checked.length));
  }
  filterLogic = () => {
    this.filtered = [];
    for(let i = 0; i < this.props.movieresults.results.length; i++) {
      let hash = this.props.movieresults.results[i].genre_names ? (this.props.movieresults.results[i].genre_names).toString() : '';
      let count = 0;
      for(let z = 0; z < this.checked.length; z++){
        if ((hash).indexOf(this.checked[z]) > -1){
          count++;
          if(count === this.checked.length){
            this.filtered.push(this.props.movieresults.results[i]);
          }
        }
      }
    }
  }
  filterMoviesOnRating= (e) =>{
    for(let i = 0; i < this.props.movieresults.results.length; i++) {
      if (this.props.movieresults.results[i].vote_average >= Number(e.currentTarget.value)){
            this.filtered.push(this.props.movieresults.results[i]);
      }else {
            for(let j = 0; j < this.filtered.length; j++) {
              if(this.filtered[j].vote_average < Number(e.currentTarget.value)){
                this.filtered.splice(j, 1);
              }
            }
          }
      }
      this.props.dispatch(getSelectedGenre([...new Set(this.filtered)], true));
  }
  updateMovieGenreWithNames = (movies, genres) =>{
    (movies).map(function(n) {
      let genreArray = [];
      for(let genreID of n.genre_ids){
        for(let genre of genres){
          if(genreID == genre.id){
            genreArray.push(genre.name)
            n.genre_names = genreArray;
          }
        }
      }
    })

    return movies;
  }
  
  render() {
    const {genres} = this.props.genreresult;
    const {results} = this.props.movieresults;

    console.log('Component MovieListPage render');

    if(!genres || ! results){
      return null;
    }
    this.updateMovieGenreWithNames(Object.assign([], results.sort(function(a, b){return b.popularity - a.popularity;})),
                                                         Object.assign([], genres));
    return (
      <div className="display-inline-grid">
        <span className="display-inline-block">
          {(genres).map((n) => {
                return (
                <span key={n.id} className="display-inline-flex">
                  <input type='checkbox' value={n.name} key={n.name+"_"+n.id} onClick={this.filterMoviesOnGenre} />
                  <label key={n.name} className="font-weight">{n.name}</label>
                </span>);
            })}
        </span>
        <span className="display-inline-block">
            <span className="font-weight">Movie Rating (between 0 and 10) </span>
            <input type='number' min="0" max="10" step="0.5" defaultValue='3' 
                    onChange={this.filterMoviesOnRating} className="margin-left"/>
        </span>
        <Moviecard/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const movieresults = state.MovieList;
  const genreresult = state.GenreList;
    return {
      movieresults,
      genreresult,
    }
}

export default connect(mapStateToProps)(MovieListPage)