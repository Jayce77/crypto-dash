import styled from 'styled-components';

export const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

const CoinHeaderGrid = ({name, symbol}) => (
  <CoinHeaderGridStyled>
    <div> { name }</div>
    <CoinSymbol> { symbol } </CoinSymbol>
  </CoinHeaderGridStyled>
);

export default CoinHeaderGrid;