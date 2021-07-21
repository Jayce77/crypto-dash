import React, { useState, useEffect } from 'react';

const CC = require('cryptocompare');
CC.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_KEY);

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
  const [coinList, setCoinList] = useState();

  const confirmFavorites = () => {
    setVisit(false);
    localStorage.setItem('cryptoDash', JSON.stringify({
      test: 'hello'
    }));
  }

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await CC.coinList();
      setCoinList(response.Data);
    }
    fetchCoins();
  }, []);


  return (
    <AppContext.Provider
      value={{page, firstVisit, setPage, confirmFavorites, coinList}}
    >
      {props.children}
    </AppContext.Provider>
  );
}