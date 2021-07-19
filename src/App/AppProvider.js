import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = props => {
  const savedSettings = () => {
    let cryptoDash = JSON.parse(localStorage.getItem('cryptoDash'));
    let settings = {};
    if (cryptoDash) {
      settings = {page: 'settings', firstVisit: true};
    }
    return settings
  };
  
  const  [page, setPage] = useState();
  const confirmFavorites = () => console.log('Confirmed');

  return (
    <AppContext.Provider
      value={{page, setPage, ...savedSettings, confirmFavorites}}
    >
      {props.children}
    </AppContext.Provider>
  );
}