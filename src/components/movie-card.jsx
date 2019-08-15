import React, { Component } from 'react';
import {IMAGE_API_URL} from '../constants/constant'
import { connect } from 'react-redux'

class MovieCard extends Component {
  render() {
    let results = this.props.results;
    let noRecordFound = ""
    console.log('Component MovieCard render');
    if(!results){
      return null;
    }
    results = Object.assign([], results.sort(function(a, b){return b.popularity - a.popularity;}));
    console.log(results);
    if(results.length == 0){
      noRecordFound = "No matching records found...";
    }
    return (
      <span>
          {(results).map((n) => {
              return (
                <span key={n.id} className="display-inline-grid">
                  <img className="image-border-radius" key={n.poster_path} src={IMAGE_API_URL + n.poster_path}/>
                  <span className="span-wrap movie-font" key={n.title}>{n.title}</span>
                  <span className="span-wrap">Genre: {n.genre_names ? n.genre_names.join(", ") : ''}</span>
                </span>);
          })}
          <div className="no-record-found">{noRecordFound}</div>
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  const movieresults = state.MovieList.results;
  const genreresult = state.GenreSelectMovieList;
  let results = [];
  if(genreresult.requiredValue > 0){
    results = Object.assign([], genreresult.value);
  }else {
    results = Object.assign([], movieresults);
  }
    return {
      results
    }
}

export default connect(mapStateToProps)(MovieCard)