import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from "./movie-card.jsx";

describe('Movie Card', () => {
    let component = "";
    const buildComponent = (props) => {
        return shallow( <MovieCard { ...props}/>)
    };

    beforeEach(() => {
        component = buildComponent({
            results: 
              [
               {
                  adult: false,
                  backdrop_path: "/hpgda6P9GutvdkDX5MUJ92QG9aj.jpg",
                  genre_ids: [28],
                  genre_names: ["Action"],
                  id: 384018,
                  original_language: "en",
                  original_title: "Fast & Furious Presents: Hobbs & Shaw",
                  overview: "A spinoff of The Fate of the Furious, focusing on Johnson's US Diplomatic Security Agent Luke Hobbs forming an unlikely alliance with Statham's Deckard Shaw.",
                  popularity: 456.135,
                  poster_path: "/keym7MPn1icW1wWfzMnW3HeuzWU.jpg",
                  release_date: "2019-08-01",
                  title: "Fast & Furious Presents: Hobbs & Shaw",
                  video: false,
                  vote_average: 6.5,
                  vote_count: 581
                }, {
                  adult: false,
                  backdrop_path: "/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
                  genre_ids: (5) [12, 16, 10751, 18, 28],
                  genre_names: (5) ["Adventure", "Animation", "Family", "Drama", "Action"],
                  id: 420818,
                  original_language: "en",
                  original_title: "The Lion King",
                  overview: "Simba idolises his father, King Mufasa, and takes to heart his and take back what is rightfully his.",
                  popularity: 265.913,
                  poster_path: "/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
                  release_date: "2019-07-12",
                  title: "The Lion King",
                  video: false,
                  vote_average: 7.1,
                  vote_count: 1739
                }
            
              ],
            dispatch:jest.fn()
        });
    });

 it('should render', () => {
      expect(component).toBeTruthy();
    });
  
})
