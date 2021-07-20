import React, { useState } from 'react';

export const AppContext = React.createContext();

export const AppProvider = props => {
  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    let settings = {page: 'dashboard', firstVisit: false};
    if (!cryptoDashData) {
      settings = {page: 'settings', firstVisit: true};
    }
    return settings
  };

  const settings = savedSettings();
  
  const [page, setPage] = useState(settings.page);
  const [firstVisit, setVisit ] = useState(settings.firstVisit);
  const confirmFavorites = () => {
    setVisit(false);
    localStorage.setItem('cryptoDash', JSON.stringify({
      test: 'hello'
    }));
  }

  return (
    <AppContext.Provider
      value={{page, firstVisit, setPage, confirmFavorites}}
    >
      {props.children}
    </AppContext.Provider>
  );
}