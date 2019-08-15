import React from "react";
import ReactDOM from "react-dom";
import './sass/style.scss';
import configureStore from './store/store'
import { Provider } from 'react-redux';
import MovieListPage from './components/movie-list-page.jsx'

console.log('App configureStore');
const store = configureStore();

const App = () => {
    console.log('start loading App');
return (
    <Provider store={store}>
        <MovieListPage/>
    </Provider>);
};

ReactDOM.render(<App />, document.getElementById("index"));