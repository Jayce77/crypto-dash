import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CoinGrid = () => (
  <AppContext.Consumer>
    {({coinList}) => (
      <CoinGridStyled>
        {coinList && Object.keys(coinList).map(coinKey =>
          <div>{coinKey}</div>)}
      </CoinGridStyled>
    )}
  </AppContext.Consumer>
);

export default CoinGrid;