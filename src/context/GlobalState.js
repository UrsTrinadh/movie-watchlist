import { createContext, useReducer, useState, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial State

const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],

  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// create Context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //useEffect
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie }); // this action will add movie to watchlist
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id }); // this action will remove movie from watchlist
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist: addMovieToWatchlist,
        removeMovieFromWatchlist: removeMovieFromWatchlist,
        addMovieToWatched: addMovieToWatched,
        moveToWatchlist: moveToWatchlist,
        removeFromWatched: removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
