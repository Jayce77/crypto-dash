import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const MAX_FAVORITES = 10;
const CC = require('cryptocompare');
CC.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_KEY);

export const AppContext = React.createContext();

export const AppProvider = props => {
  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    const  defaultFavorites = ['BTC', 'ETH', 'ADA', 'MATIC', 'LINK'];
    let settings = {page: 'dashboard', firstVisit: false};
    if (!cryptoDashData) {
      settings = {page: 'settings', firstVisit: true, favorites: defaultFavorites};
    } else {
      let {favorites} = cryptoDashData;
      settings = {favorites, ...settings};
    }
    return settings;
  };

  const settings = savedSettings();
  
  const [page, setPage] = useState(settings.page);
  const [filteredCoins, setFilteredCoins] = useState();
  const [firstVisit, setVisit ] = useState(settings.firstVisit);
  const [coinList, setCoinList] = useState();
  const [favorites, setFavorites] = useState(settings.favorites);
  const [prices, setPrices] = useState();

  const confirmFavorites = () => {
    setVisit(false);
    fetchPrices();
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: favorites
    }));
  }

  const fetchPrices = async () => {
    let prices = await getPriceData();
    console.log(prices)
    prices = prices.filter(price => Object.keys(price).length);
    setPrices({prices});
  }

  const getPriceData = async () => {
    let returnData = [];
    for (const favorite of favorites) {
       try {
         const priceData = await CC.priceFull(favorite, 'USD');
         returnData = returnData.concat(priceData);
       } catch (e) {
         console.warn('Fetch price error:', e);
       }
    };
    return returnData;
  }

  const addCoin = (key) => {
    if (favorites.length < MAX_FAVORITES) {
      setFavorites([key, ...favorites]);
    }
  }

  const removeCoin = (key) => setFavorites(_.without(favorites, key));

  const isInFavorites = (key) => _.includes(favorites, key);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await CC.coinList();
      setCoinList(response.Data);
    }
    fetchCoins();
  }, []);

  useEffect(() => {
    !settings.firstVisit && fetchPrices();
  }, [])


  return (
    <AppContext.Provider
      value={{
        page,
        firstVisit,
        setPage,
        setFilteredCoins,
        filteredCoins,
        confirmFavorites,
        coinList,
        favorites,
        setFavorites,
        addCoin,
        removeCoin,
        isInFavorites
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}