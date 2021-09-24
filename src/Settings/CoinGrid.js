import { coinList } from 'cryptocompare';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

const getLowerSecctionCoins = (filteredCoins, coinList) => 
  filteredCoins 
  ? Object.keys(filteredCoins)
  : Object.keys(coinList).slice(0, 100);

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => 
  topSection 
  ? favorites
  : getLowerSecctionCoins(filteredCoins, coinList);

const CoinGrid = ({topSection}) => (
  <AppContext.Consumer>
    {({coinList, favorites, filteredCoins}) => (
      <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey =>
          <CoinTile topSection={topSection} coinKey={coinKey} key={coinKey.Id} />)}
      </CoinGridStyled>
    )}
  </AppContext.Consumer>
);

export default CoinGrid;