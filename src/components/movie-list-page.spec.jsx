import React from 'react';
import { shallow } from 'enzyme';
import MovieListPage from "./movie-list-page.jsx";

describe('Movie List Page', () => {
    let component = "";
    const buildComponent = (props) => {
        return shallow( <MovieListPage { ...props}/>)
    };

    beforeEach(() => {
        component = buildComponent({
          genreresult:{
            AED:123
          },
          movieresult:{
            AED:123
          },
          dispatch:jest.fn()
        });
    });

 it('should render', () => {
      expect(component).toBeTruthy();
    });
  
})
