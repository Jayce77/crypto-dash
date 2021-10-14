import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import moment from 'moment';

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;
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
      let {favorites, currentFavorite} = cryptoDashData;
      settings = {favorites, currentFavorite, ...settings};
    }
    return settings;
  };

  const settings = savedSettings();
  
  const [page, setPage] = useState(settings.page);
  const [filteredCoins, setFilteredCoins] = useState();
  const [firstVisit, setVisit ] = useState(settings.firstVisit);
  const [coinList, setCoinList] = useState();
  const [favorites, setFavorites] = useState(settings.favorites);
  const [currentFavorite, setCurrentFavorite] = useState(settings.currentFavorite);
  const [prices, setPrices] = useState();
  const [historicalPrices, setHistoricalPrices] = useState();

  const confirmFavorites = () => {
    const newFavorite = favorites[0]; 
    setCurrentFavorite(newFavorite);
    setVisit(false);
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: favorites,
      currentFavorite: newFavorite
    }));
  }

  const updateCurrentFavorite = (sym) => {
    setCurrentFavorite(sym);
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }));
  }

  const getPriceData = useCallback(async () => {
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
  }, [favorites]);
  
  const getHistoricalData = useCallback(async () => {
    console.log('getting data');
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      const data = CC.priceHistorical(
        currentFavorite,
        'USD',
        moment().subtract({months: units}).toDate());
      promises = promises.concat(data)
    }
    return Promise.all(promises);
  }, [currentFavorite]);

  useEffect(() => {
    return async () => {
      if (currentFavorite) {
        console.log('current favorite', currentFavorite)
        let histroicalPriceData = await getHistoricalData();
        console.log(histroicalPriceData);
        setHistoricalPrices(histroicalPriceData)
      }
    }
  }, [currentFavorite, getHistoricalData]);
  
  const fetchPrices = useCallback(async () => {
    let prices = await getPriceData();
    prices = prices.filter(price => Object.keys(price).length);
    setPrices(prices);
  }, [getPriceData]);

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
  }, [settings.firstVisit, fetchPrices])


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
        currentFavorite,
        updateCurrentFavorite,
        setFavorites,
        addCoin,
        removeCoin,
        isInFavorites,
        prices
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}