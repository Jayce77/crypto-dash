import styled, { css } from 'styled-components';

const ImageSize = styled.img`
  height: 50px;
  ${props => props.spotlight && css`
    height: 200px;
    display: block;
    margin: auto;
  `}
`;

const CoinImage = ({coin, spotlight}) => (
  <ImageSize
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
    alt={coin.Symbol}
    spotlight={spotlight} 
  />
);

export default CoinImage;