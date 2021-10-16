import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import moment, { months } from 'moment';

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
  
  const [page, setPage] = useState();
  const [filteredCoins, setFilteredCoins] = useState();
  const [firstVisit, setVisit ] = useState();
  const [coinList, setCoinList] = useState();
  const [favorites, setFavorites] = useState();
  const [currentFavorite, setCurrentFavorite] = useState();
  const [prices, setPrices] = useState();
  const [historicalPrices, setHistoricalPrices] = useState();

  const formatPriceData = useCallback((histroicalPriceData) => {
    return [
      {
        name: currentFavorite,
        data: histroicalPriceData.map((d, i) => [
          moment().subtract({months: TIME_UNITS - i}).valueOf(),
          d.USD
        ])
      }
    ]
  }, [currentFavorite]);

  useEffect(() => {
    const settings = savedSettings();
    setPage(settings.page);
    setVisit(settings.firstVisit);
    setFavorites(settings.favorites);
    setCurrentFavorite(settings.currentFavorite);
  }, [setPage, setVisit, setFavorites, setCurrentFavorite])

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
    setHistoricalPrices(null);
    setCurrentFavorite(sym);
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }));
  }

  const getPriceData = useCallback(async () => {
    let returnData = [];
    if (favorites) {
      for (const favorite of favorites) {
        try {
          const priceData = await CC.priceFull(favorite, 'USD');
          returnData = returnData.concat(priceData);
        } catch (e) {
          console.warn('Fetch price error:', e);
        }
      }
    }
    return returnData;
  }, [favorites]);
  
  const getHistoricalData = useCallback(async () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      const data = CC.priceHistorical(
        currentFavorite,
        'USD',
        moment().subtract({months: units}).toDate());
      promises = promises.concat(data)
    }
    return await Promise.all(promises)
  }, [currentFavorite]);

  useEffect(() => {
    if (currentFavorite) {
      const fetchHistoricalData = async () => {
        let histroicalPriceData = await getHistoricalData();
        const formatedData = formatPriceData(histroicalPriceData);
        setHistoricalPrices(formatedData);
      }

      fetchHistoricalData();
    }
  }, [currentFavorite, getHistoricalData, formatPriceData]);
  
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
        prices,
        historicalPrices
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}